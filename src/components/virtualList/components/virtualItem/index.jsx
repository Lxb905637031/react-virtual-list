import './style/index.less'

export default function VirtualItem({
    children
}) {
    return (
        <div className="virtual-item">
            { children }
        </div>
    )
} 