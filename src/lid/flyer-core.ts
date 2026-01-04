// src/lib/flyer-core.ts

export type FlyerIntent =
  | "next_step"
  | "previous_step"
  | "status_check"
  | "greeting"
  | "unknown";

export type FlyerDecision = {
  type: "navigation" | "status" | "greeting" | "unknown";
  action: string;
};

export type FlyerCoreResult = {
  type: "action";
  content: string;
  meta: {
    intent: FlyerIntent;
    decision: FlyerDecision;
  };
};

export function flyerCore(text: string): FlyerCoreResult {
  const intent = parseIntent(text);
  const decision = decideAction(intent);
  const result = executeAction(decision);

  return {
    type: "action",
    content: result,
    meta: {
      intent,
      decision
    }
  };
}

// -------- Intent Engine --------
function parseIntent(text: string): FlyerIntent {
  const t = (text || "").toLowerCase();

  if (!t) return "unknown";

  if (t.includes("次") || t.includes("進")) return "next_step";
  if (t.includes("戻") || t.includes("前")) return "previous_step";
  if (t.includes("状態") || t.includes("ステータス")) return "status_check";
  if (["こんにちは", "やあ", "おはよう", "こんばんは"].some(g => text.includes(g)))
    return "greeting";

  return "unknown";
}

// -------- Decision Engine --------
function decideAction(intent: FlyerIntent): FlyerDecision {
  if (intent === "next_step") {
    return { type: "navigation", action: "go_next" };
  }
  if (intent === "previous_step") {
    return { type: "navigation", action: "go_previous" };
  }
  if (intent === "status_check") {
    return { type: "status", action: "report" };
  }
  if (intent === "greeting") {
    return { type: "greeting", action: "respond" };
  }

  return { type: "unknown", action: "none" };
}

// -------- Action Executor --------
function executeAction(decision: FlyerDecision): string {
  const { type, action } = decision;

  if (type === "navigation" && action === "go_next") {
    return "次のフェーズに静かに移行します。";
  }

  if (type === "navigation" && action === "go_previous") {
    return "ひとつ前のフェーズに戻ります。";
  }

  if (type === "status" && action === "report") {
    return "現在は development フェーズ。Flyer Core は正常に稼働しています。";
  }

  if (type === "greeting" && action === "respond") {
    return "こんにちは、Flyerです。必要なときだけ静かに最適化します。";
  }

  return "意図をまだうまくつかめていません。";
}
