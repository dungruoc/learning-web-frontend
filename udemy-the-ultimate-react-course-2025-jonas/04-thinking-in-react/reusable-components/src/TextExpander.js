import { useState } from "react"

export default function TextExpander({
    children,
    collasedNumChars,
    expandButtonText = 'show more',
    collaseButtonText = 'show less',
    buttonColor = 'blue',
    className = ''
}) {
    const [collapsed, setCollapsed] = useState(false);

    const buttonStyle = {
        color: buttonColor,
        margin: '0 12px'
    }

    return (
        <p className={className}>
            <span>
            {collasedNumChars && (collasedNumChars < children.length) && collapsed ? children.slice(0, collasedNumChars) : children}
            </span>
            {collasedNumChars && (collasedNumChars < children.length) && <span role="button" style={buttonStyle} onClick={() => setCollapsed(c => !c)}>{collapsed ? expandButtonText : collaseButtonText}</span>}
        </p>
    )
}