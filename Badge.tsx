import type { HTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

import "./badge.css"

const badgeVariants = ["Dot", "Text", "Longest text"] as const

type BadgeVariant = (typeof badgeVariants)[number]

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** DSL 变体属性「类型」— Dot / Text / Longest text */
  类型?: BadgeVariant
  /** 数字角标内容（Text / Longest text 变体使用） */
  count?: number | string
  /** 最大显示值，超过时显示 "{maxCount}+"，默认 99 */
  maxCount?: number
  children?: ReactNode
}

function Badge({
  类型: type = "Text",
  count,
  maxCount = 99,
  children,
  className,
  ...props
}: BadgeProps) {
  const displayText = resolveText({ type, count, maxCount, children })
  const isMultiDigit = typeof displayText === "string" && displayText.length >= 2

  return (
    <span
      className={cn(
        "harmony-badge",
        `harmony-badge--${type.replace(/\s+/g, "-")}`,
        type === "Text" && isMultiDigit && "harmony-badge--multi",
        className,
      )}
      role={type === "Dot" ? "status" : undefined}
      aria-label={type === "Dot" ? undefined : String(displayText ?? "")}
      {...props}
    >
      <span className="harmony-badge__text">{displayText}</span>
    </span>
  )
}

function resolveText({
  type,
  count,
  maxCount,
  children,
}: {
  type: BadgeVariant
  count?: number | string
  maxCount: number
  children?: ReactNode
}): ReactNode {
  if (type === "Dot") {
    return null
  }

  if (children !== undefined) {
    return children
  }

  if (count === undefined) {
    return null
  }

  const num = typeof count === "number" ? count : Number(count)

  if (Number.isNaN(num)) {
    return count
  }

  if (num > maxCount) {
    return `${maxCount}+`
  }

  return String(num)
}

export { Badge, badgeVariants }
export type { BadgeProps, BadgeVariant }
