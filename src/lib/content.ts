export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Welcome to Keeparr Notes" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com/listlessbird/keeparr",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class:
                  "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
              },
            },
          ],
          text: "You can create notes here",
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "You can also write code" }],
    },
    {
      type: "codeBlock",
      attrs: { language: null },
      content: [
        {
          type: "text",
          text: 'import { Editor } from "novel";\n\nexport default function App() {\n  return (\n     <Editor />\n  )\n}',
        },
      ],
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "orderedList",
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Slash menu & bubble menu" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "AI autocomplete (type " },
                { type: "text", marks: [{ type: "code" }], text: "++" },
                {
                  type: "text",
                  text: " to activate, or select from slash menu)",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Image uploads (drag & drop / copy & paste, or select from slash menu) ",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Add youtube videos from the command slash menu:",
                },
              ],
            },
            {
              type: "youtube",
              attrs: {
                src: "https://youtu.be/hRY5NxtVbIk?si=BHnrOTEnlBCbC7cS",
              },
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Mathematical symbols with LaTeX expression:",
                },
              ],
            },
            {
              type: "orderedList",
              attrs: { tight: true, start: 1 },
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "math", attrs: { latex: "E = mc^2" } }],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "math",
                          attrs: { latex: "a^2 = \\sqrt{b^2 + c^2}" },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "math",
                          attrs: {
                            latex:
                              "\\hat{f} (\\xi)=\\int_{-\\infty}^{\\infty}f(x)e^{-2\\pi ix\\xi}dx",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "math",
                          attrs: {
                            latex:
                              "A=\\begin{bmatrix}a&b\\\\c&d \\end{bmatrix}",
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        { type: "math", attrs: { latex: "\\sum_{i=0}^n x_i" } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { type: "horizontalRule" },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Learn more" }],
    },
    {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          attrs: { checked: false },
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Star the project on " },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://github.com/listlessbird/keeparr",
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                        class:
                          "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
                      },
                    },
                  ],
                  text: "GitHub",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
