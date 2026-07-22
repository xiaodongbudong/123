import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { AlphabetIndexerLable, alphabetIndexerLableTypes } from "./AlphabetIndexerLable"

function InteractiveCnLableDemo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const items = [
    { text: "G", 状态: "enabled" as const },
    { text: "古", 状态: "enabled" as const },
    { text: "顾", 状态: "enabled" as const },
  ]

  return (
    <div className="flex items-center gap-6">
      <AlphabetIndexerLable
        activeIndex={activeIndex}
        items={items}
        onItemSelect={(_, index) => setActiveIndex(index)}
        类型="cn"
      />
      <div className="rounded bg-white/80 px-3 py-2 text-sm text-slate-700">
        当前索引：{items[activeIndex]?.text}
      </div>
    </div>
  )
}

const meta = {
  title: "Components/Views/AlphabetIndexerLable",
  component: AlphabetIndexerLable,
  tags: ["autodocs"],
  args: {
    类型: "Latin",
    value: "G",
  },
  argTypes: {
    类型: {
      control: "select",
      options: alphabetIndexerLableTypes,
      description: "Pixso DSL 属性 `类型`: Latin (圆形字母按钮) | cn (竖条中文索引)",
    },
    value: {
      control: "text",
      description: "Latin 类型展示的当前索引值",
    },
    items: {
      control: "object",
      description: "cn 类型展示的索引项",
    },
    activeIndex: {
      control: "number",
      description: "cn 类型当前激活项索引",
    },
    onItemSelect: {
      action: "item selected",
      description: "cn 索引项点击回调",
    },
  },
  parameters: {
    docs: {
      description: {
        component: [
          "## AlphabetIndexerLable — 字母索引标签",
          "",
          "**Pixso 来源**: `https://pixso.cn/app/design/HA_e8I2mE7Oa0b5ZoeokSA?item-id=5317:20448`",
          "",
          "### 1:1 还原参数 (DSL 真值)",
          "",
          "| 参数 | Latin | cn |",
          "| --- | --- | --- |",
          "| 外层尺寸 | 56×56 | 66×178 |",
          "| 圆角 | 28px | 36px (面板) |",
          "| 关键项 | 48×48 | 48×48 |",
          "| 文字区 | 32×32 | 32×32 |",
          "| 字体 | HarmonyHeiTi Medium 24px | 同左 |",
          "| 背景模糊 | blur(40.77px) | blur(15px) |",
          "| 阴影 | 0px 4px 16px rgba(0,0,0,0.102) | 同左 |",
          "| 填充 | COMPONENT_REGULAR | 同左 |",
          "",
          "### DSL ↔ Prop 对照",
          "",
          "| DSL 属性 | React Prop | 可取值 |",
          "| --- | --- | --- |",
          "| `类型` | `类型` | `\"Latin\"` \\| `\"cn\"` |",
          "| 当前索引 | `value` | `string` |",
          "| cn 索引项 | `items` / `activeIndex` / `onItemSelect` | `CnIndexItem[]` / `number` / callback |",
          "| `状态` | `CnIndexItem.状态` | `\"enabled\"` \\| `\"activated\"` |",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-[var(--harmony-storybook-preview-bg,var(--harmony-background-secondary))] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AlphabetIndexerLable>

export default meta

type Story = StoryObj<typeof meta>

/** 交互式 Playground — 通过 Controls 切换类型 */
export const Playground: Story = {}

/** 类型画廊 — Latin + cn 并排对照 */
export const TypeGallery: Story = {
  render: () => (
    <div className="flex items-end gap-8 rounded-[32px] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      {alphabetIndexerLableTypes.map((type) => (
        <div className="flex flex-col items-center gap-3" key={type}>
          <span className="text-sm font-medium text-slate-900">类型={type}</span>
          <AlphabetIndexerLable 类型={type} />
        </div>
      ))}
    </div>
  ),
}

/** 默认: Latin (圆形玻璃字母按钮) */
export const Default: Story = {
  args: { 类型: "Latin" },
}

/** cn (竖条中文索引，含 activated + enabled 项) */
export const Cn: Story = {
  args: { 类型: "cn" },
}

/** cn 运行时交互: 点击切换当前索引项 */
export const InteractiveCn: Story = {
  render: () => <InteractiveCnLableDemo />,
}
