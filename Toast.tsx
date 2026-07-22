import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Variant constants (aligned with DSL: 类型=Phone) ───
const toastTypes = ["Phone"] as const;
type ToastType = (typeof toastTypes)[number];

// ─── Props (DSL ↔ Prop 硬对齐) ───
// DSL field          → Prop
// 内容 (nodeText)    → 内容  (React prop name, default: DSL nodeText "Toast content")
// 类型               → 类型   (DSL variant: 类型=Phone)
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  内容?: string;
  类型?: ToastType;
  /**
   * 距页面底部的固定偏移量（px）。传入后 Toast 自动以 position: absolute
   * 定位在父容器底部。推荐值 108 = Aibottombar(28) + 底部间距(80)。
   * 不传则不添加定位，由外部容器控制位置。
   */
  底部偏移?: number;
}

// ─── Component ───
function Toast({
  内容 = "Toast content",
  类型 = "Phone",
  底部偏移,
  className,
  style,
  ...props
}: ToastProps) {
  const toast = (
    <div
      className={cn(
        "hm-toast",
        "inline-flex items-center justify-center gap-2.5",
        "min-h-9 rounded-[18px] px-4 py-2",
        "backdrop-blur-[40px]",
        "shadow-[0_10px_60px_rgba(0,0,0,0.2)]",
        "font-['HarmonyHeiTi',var(--font-sans)] text-[14px] font-normal leading-[19px] tracking-normal",
        "text-[var(--harmony-font-primary)]",
        "whitespace-nowrap select-none",
        className,
      )}
      style={{
        backgroundColor: "var(--COMPONENT_ULTRA_THICK_fill)",
        ...style,
      }}
      role="status"
      aria-live="polite"
      {...props}
    >
      {内容}
    </div>
  );

  if (底部偏移 !== undefined) {
    return (
      <div
        className="absolute left-0 right-0 flex justify-center"
        style={{ bottom: `${底部偏移}px`, zIndex: 60 }}
      >
        {toast}
      </div>
    );
  }

  return toast;
}

export { Toast, toastTypes };
export type { ToastType };
