import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, toastTypes } from "./Toast";

const meta = {
  title: "Components/Views/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    内容: "Toast content",
    类型: "Phone",
  },
  argTypes: {
    内容: { control: "text" },
    类型: {
      control: "select",
      options: toastTypes,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `**Pixso 来源**：[5410:23821](https://pixso.cn/app/design/H81fph4IPxYjDA3GCQmGGQ?item-id=5410:23821)

HarmonyOS Toast 轻提示组件，半透明毛玻璃表面 + 圆角胶囊形态。`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--harmony-storybook-preview-bg,var(--harmony-background-secondary))] p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground：单实例 + Controls 交互 ───
export const Playground: Story = {
  args: {
    内容: "Toast content",
    类型: "Phone",
  },
};

// ─── Overview：默认态展示 ───
export const Default: Story = {
  args: {
    内容: "操作成功",
    类型: "Phone",
  },
};

// ─── Variant：多内容文案展示 ───
export const Variant: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Toast 内容="Toast content" 类型="Phone" />
      <Toast 内容="设置已保存" 类型="Phone" />
      <Toast 内容="网络连接已断开" 类型="Phone" />
      <Toast 内容="文件下载完成" 类型="Phone" />
    </div>
  ),
};
