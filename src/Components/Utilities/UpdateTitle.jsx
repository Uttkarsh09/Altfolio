import {useLayoutEffect} from 'react'

function useUpdateTitle(title) {
    useLayoutEffect(()=>{
        document.title = title;
    })
}

export default useUpdateTitle;