import { useEffect, useState } from 'react'

function useVirtual(listRef, list, isFullScreen) {
    // 存储原始数据
    const origin = list
    // 视图高度
    let viewHeight = null
    // 单独项列表项高度
    let itemHeight = 0
    // 区间
    let dur = 0
    // 根元素字体大小
    const rootFontSize = parseInt(document.documentElement.style.fontSize)


    // 展示在页面视图的数据
    const [viewList, setViewList] = useState(list)
    // 最顶部索引
    const [startIndex, setStartIndex] = useState(0)
    // 最底部索引
    const [endIndex, setEndIndex] = useState(0)
    // padding
    const [padding, setPadding] = useState({
        paddingTop: 0,
        paddingBottom: 0
    })

    useEffect(() => {
        init(listRef)
    }, [])

    useEffect(() => {
        initData(listRef.current)
        update()
    }, [startIndex])

    function init(ref) {
        initData(ref.current)
        render(startIndex, dur + 1)
        eventBind(ref.current)
    }

    function initData(dom) {
        // 全屏情况下目标对象是document,非全屏的情况下目标对象是当前dom元素对象
        const target = isFullScreen ? document.documentElement : dom
        viewHeight = isFullScreen ? target.offsetHeight : target.parentNode.offsetHeight
        itemHeight = target.getElementsByClassName('virtual-item')[0].offsetHeight
        dur = ~~(viewHeight / itemHeight)
    }

    function eventBind(dom) {
        // 全屏情况下滚动事件的目标对象是document,非全屏的情况下滚动事件绑定的目标对象是当前dom元素对象的父节点
        const eventTarget = isFullScreen ? window : dom.parentNode
        eventTarget.addEventListener('scroll', e => handleScroll(e), false)
    }

    function render(startIndex, endIndex) {
        setViewList(() => origin.slice(startIndex, endIndex))
        setEndIndex(() => startIndex + dur + 1)
    }

    function handleScroll(e) {
        e.stopPropagation()
        // 全屏情况下滚动事件的目标对象是document,非全屏的情况下滚动事件绑定的目标对象是当前dom元素对象的父节点
        const target = isFullScreen ? document.documentElement : listRef.current.parentNode
        setStartIndex(() => (~~(target.scrollTop / itemHeight)))
    }

    function update() {
        if (startIndex === endIndex) return
        setEndIndex(() => startIndex + dur)
        render(startIndex, endIndex)
        setPadding(() => {
            return {
                paddingTop: (startIndex * itemHeight) / rootFontSize,
                paddingBottom: ((origin.length - endIndex) * itemHeight) / rootFontSize
            }
        })
    }

    return [
        viewList,
        padding
    ]
    
}

export {
    useVirtual
}
