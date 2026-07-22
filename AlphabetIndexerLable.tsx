import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

import "./alphabet-indexer-lable.css"

/** Pixso DSL 属性: 类型 (组件顶层变体) */
export const alphabetIndexerLableTypes = ["Latin", "cn"] as const

export type AlphabetIndexerLableType =
  (typeof alphabetIndexerLableTypes)[number]

export interface AlphabetIndexerLableProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Pixso DSL 属性 `类型`: Latin (圆形字母按钮) | cn (竖条中文索引) */
  类型?: AlphabetIndexerLableType
  /** Latin 类型展示的当前索引值 */
  value?: string
  /** cn 类型展示的索引项，默认保持 Pixso 样本值 */
  items?: readonly CnIndexItem[]
  /** cn 类型当前激活项索引；未传时读取 items 中的 activated 状态 */
  activeIndex?: number
  /** cn 索引项点击回调 */
  onItemSelect?: (item: CnIndexItem, index: number) => void
}

/** cn 索引项 */
export type CnIndexItem = {
  text: string
  /** Pixso DSL 属性 `状态`: enabled (默认) | activated (选中态: 蓝字+灰底) */
  状态?: "activated" | "enabled"
}

const defaultCnItems: readonly CnIndexItem[] = [
  { text: "G", 状态: "activated" },
  { text: "古", 状态: "enabled" },
  { text: "顾", 状态: "enabled" },
]

function AlphabetIndexerLableCn({
  activeIndex,
  items,
  onItemSelect,
}: {
  activeIndex?: number
  items: readonly CnIndexItem[]
  onItemSelect?: (item: CnIndexItem, index: number) => void
}) {
  return (
    <div className="hm-alphabet-indexer-lable__cn-panel">
      {items.map((item, index) => {
        const isActive =
          activeIndex === undefined
            ? item.状态 === "activated"
            : index === activeIndex

        return (
          <button
            aria-pressed={isActive}
            className={cn(
              "hm-alphabet-indexer-lable__cn-item",
              isActive && "hm-alphabet-indexer-lable__cn-item--activated",
            )}
            key={`${item.text}-${index}`}
            onClick={() => onItemSelect?.(item, index)}
            type="button"
          >
            <span className="hm-alphabet-indexer-lable__text">{item.text}</span>
          </button>
        )
      })}
    </div>
  )
}

function AlphabetIndexerLableLatin({ value }: { value: string }) {
  return (
    <div className="hm-alphabet-indexer-lable__latin-chip">
      <span className="hm-alphabet-indexer-lable__text">{value}</span>
    </div>
  )
}

/**
 * AlphabetIndexerLable — 字母索引标签 (1:1 还原 Pixso)
 *
 * Pixso 来源: https://pixso.cn/app/design/HA_e8I2mE7Oa0b5ZoeokSA?item-id=5317:20448
 *
 * - Latin: 圆形玻璃按钮 (56×56, cornerRadius 28, blur 40.77px)
 * - cn: 竖条中文索引 (66×178, panel cornerRadius 36, blur 15px)
 * - Fill: Light/Blur/COMPONENT_REGULAR (Pixso style 616:9110)
 */
export function AlphabetIndexerLable({
  类型 = "Latin",
  value = "G",
  items = defaultCnItems,
  activeIndex,
  onItemSelect,
  className,
  ...props
}: AlphabetIndexerLableProps) {
  return (
    <div
      className={cn(
        "hm-alphabet-indexer-lable",
        `hm-alphabet-indexer-lable--type-${类型.toLowerCase()}`,
        className,
      )}
      data-type={类型}
      {...props}
    >
      {类型 === "cn" ? (
        <AlphabetIndexerLableCn
          activeIndex={activeIndex}
          items={items}
          onItemSelect={onItemSelect}
        />
      ) : (
        <AlphabetIndexerLableLatin value={value} />
      )}
    </div>
  )
}
