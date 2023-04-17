import { useRef } from 'react'
import { useVirtual } from './hooks/index'

import VirtualItem from './components/virtualItem'

export default function VirtualList({
    isFullScreen = true
}) {
    const listRef = useRef()

    const [ 
        viewList,
        padding
    ] = useVirtual(listRef, new Array(100).fill(0).map((item, index) => item + index + 1), isFullScreen)

    return (
        <div
            className="virtual-list"
            id="virtual-list"
            ref={ listRef }
            style={{
                paddingBottom: padding.paddingBottom + 'rem',
                paddingTop: padding.paddingTop + 'rem'
            }}
        >
            {
                viewList.map((item) => {
                    return (
                        <VirtualItem
                            key={ item }
                        >
                            <div>{ item }</div>
                        </VirtualItem>
                    )
                })
            }
        </div>
    )
}
