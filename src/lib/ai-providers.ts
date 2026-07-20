/**
 * AI Provider Abstraction Layer
 *
 * Supports multiple AI providers. Swap by setting AI_PROVIDER in .env:
 * - openai: OpenAI GPT-4o / GPT-4o-mini
 * - deepseek: DeepSeek V3 (best value for Chinese developers)
 * - anthropic: Claude 3.5 Sonnet
 *
 * To use: edit lib/ai.ts and replace generateDemoCopy() with callAI()
 */

export type AIProvider = "openai" | "deepseek" | "anthropic";

interface AICallOptions {
  provider?: AIProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Call AI API with automatic provider routing.
 */
export async function callAI(
  systemPrompt: string,
  userPrompt: string,
  options: AICallOptions = {}
): Promise<AIResponse> {
  const provider = options.provider || getDefaultProvider();

  switch (provider) {
    case "openai":
      return callOpenAI(systemPrompt, userPrompt, options);
    case "deepseek":
      return callDeepSeek(systemPrompt, userPrompt, options);
    case "anthropic":
      return callAnthropic(systemPrompt, userPrompt, options);
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}

/**
 * Generate structured JSON output from AI.
 * Provider will be instructed to return valid JSON only.
 */
export async function callAIStructured<T>(
  systemPrompt: string,
  userPrompt: string,
  options: AICallOptions = {}
): Promise<T> {
  const jsonPrompt = `${userPrompt}\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no explanation, just the JSON object.`;
  const response = await callAI(systemPrompt, jsonPrompt, {
    ...options,
    temperature: 0.3, // Lower temperature for structured output
  });

  try {
    // Handle potential markdown code blocks
    const cleaned = response.content
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(`Failed to parse AI response as JSON: ${response.content.slice(0, 200)}`);
  }
}

// ============================================================
// Provider Implementations
// ============================================================

async function callOpenAI(
  systemPrompt: string,
  userPrompt: string,
  options: AICallOptions
): Promise<AIResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

  const model = options.model || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: "openai",
    model,
    usage: {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0,
    },
  };
}

async function callDeepSeek(
  systemPrompt: string,
  userPrompt: string,
  options: AICallOptions
): Promise<AIResponse> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY not configured");

  const model = options.model || "deepseek-chat";

  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0].message.content,
    provider: "deepseek",
    model,
    usage: {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0,
    },
  };
}

async function callAnthropic(
  systemPrompt: string,
  userPrompt: string,
  options: AICallOptions
): Promise<AIResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const model = options.model || "claude-3-5-sonnet-20241022";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
      max_tokens: options.maxTokens ?? 2000,
      temperature: options.temperature ?? 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  return {
    content: data.content[0].text,
    provider: "anthropic",
    model,
    usage: {
      promptTokens: data.usage?.input_tokens || 0,
      completionTokens: data.usage?.output_tokens || 0,
      totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    },
  };
}

/** Get the default provider from env, fallback to deepseek */
function getDefaultProvider(): AIProvider {
  const configured = process.env.AI_PROVIDER as AIProvider | undefined;
  if (configured && ["openai", "deepseek", "anthropic"].includes(configured)) {
    return configured;
  }
  // Default: check which API keys are set
  if (process.env.DEEPSEEK_API_KEY) return "deepseek";
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  return "deepseek"; // final fallback
}

// ============================================================
// Provider Cost Comparison (approximate, per 1M tokens)
// ============================================================
/*
| Provider  | Model          | Input/1M  | Output/1M | Best For            |
|-----------|----------------|-----------|-----------|---------------------|
| DeepSeek  | deepseek-chat  | ~$0.14    | ~$0.28    | Best value, Chinese |
| OpenAI    | gpt-4o-mini    | ~$0.15    | ~$0.60    | General purpose     |
| OpenAI    | gpt-4o         | ~$2.50    | ~$10.00   | Complex reasoning   |
| Anthropic | claude-3.5-son | ~$3.00    | ~$15.00   | Long-form content   |
*/
