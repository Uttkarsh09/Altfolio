import React, {useLayoutEffect} from 'react'

function useUpdateTitle(title) {
    document.title = title;
}

export default useUpdateTitle;