import React from "react"

export function UIAvatar({
  alt,
  size = 24,
  text = "NU",
  indicatorColor = "red",
  ...props
}: {
  alt: string
  size?: number
  text: string
  indicatorColor?: string
} & React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      <circle
        fill={`${indicatorColor}`}
        width={size}
        height={size}
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
      />
      <text
        x={"50%"}
        y={"50%"}
        className="fill-white leading-none"
        alignmentBaseline="middle"
        textAnchor="middle"
        dominantBaseline="middle"
        dy={".1em"}
      >
        {text}
      </text>
    </svg>
  )
}
