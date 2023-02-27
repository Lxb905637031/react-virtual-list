import { useEffect, useState } from 'react'

function useVirtual(listRef, list) {
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
        const target = document.documentElement.offsetHeight < dom.offsetHeight ? document.documentElement : dom
        viewHeight = target.offsetHeight
        itemHeight = target.getElementsByClassName('virtual-item')[0].offsetHeight
        dur = ~~(viewHeight / itemHeight)
    }

    function eventBind(dom) {
        /*
         * 滚动事件源对象的判断，当虚拟列表的高度是大于视图页面高度，监听对象为window即可
         * 在单一区域的虚拟列表滚动监听对象测为dom元素本身 
        */ 
        const eventTarget = document.documentElement.offsetHeight < dom.offsetHeight ? window : dom
        eventTarget.addEventListener('scroll', e => handleScroll(e))
    }

    function render(startIndex, endIndex) {
        setViewList(() => origin.slice(startIndex, endIndex))
        setEndIndex(() => startIndex + dur + 1)
    }

    function handleScroll() {
        setStartIndex(() => (~~(document.documentElement.scrollTop / itemHeight)))
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
