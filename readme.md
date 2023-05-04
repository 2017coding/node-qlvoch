在 my-data 文件夹下有多个子文件夹并且数量不定, **层级不定**, my-data 文件目录如下:
.
├── module-a
│ ├── function-a
│ │ ├── index.js
│ │ ├── sub-function-a
│ │ │ ├── grand-func.js
│ │ │ └── index.js
│ │ └── sub-function-b.js
│ ├── function-b.js
│ ├── index
│ │ ├── index.js
│ │ └── sub-function-c.js
│ └── index.js
├── module-b
│ └── index.js
└── module-c
└── index.js
文件都是统一的格式, 即

```ts
type TData = Record<
  string,
  {
    en: string;
    zh: string;
    fr: sting;
  }
>;
```

处理完以后的数据结构如下

```json
{
  "en": {
    "moduleA": {
      "functionA": {
        "subFunctionA": {
          "grandFunc": {
            "canvas": "canvas"
          },
          "input": "input"
        },
        "body": "body",
        "subFunctionB": {
          "p": "p"
        }
      },
      "functionB": {
        "h1": "h1"
      },
      "nav": "nav",
      "video": "video",
      "subFunctionC": {
        "p": "p"
      }
    },
    "moduleB": {
      "footer": "footer"
    },
    "moduleC": {
      "header": "header"
    }
  },
  "zh": {
    "moduleA": {
      "functionA": {
        "subFunctionA": {
          "grandFunc": {
            "canvas": "画布"
          },
          "input": "输入框"
        },
        "body": "主体",
        "subFunctionB": {
          "p": "段落"
        }
      },
      "functionB": {
        "h1": "一级标题"
      },
      "nav": "导航",
      "video": "视频",
      "subFunctionC": {
        "p": "段落"
      }
    },
    "moduleB": {
      "footer": "底部"
    },
    "moduleC": {
      "header": "头部"
    }
  }
}
```

提示:

- `index.js`文件下的数据会和`index/index.js`的数据合并到同一层级下
- `sub-function-a/index.js`和`sub-function-a.js`下的数据经过处理后应该在同一层级下
- 请将题目fork到自己project中, 完成后向hr反馈最新的project link即可

## 本题考点

- 1.请使用 node.js 按照要求应用程序
- 2.请考虑代码的可读性和复用性(规范格式, 注释, 功能粒度控制)
- 3.本题考点: 递归, 闭包, 文件处理, 正则表达式