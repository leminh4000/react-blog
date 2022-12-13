import React from 'react'

export default ({comments}) => {

    const renderedComments = comments.map((comment) => {
        let content

        if (comment.status === 'approved') {
            content = comment.content
        }
        if (comment.status === 'pending') {
            content = 'This is a pending comment'
        }
        if (comment.status === 'rejected') {
            content = 'this is a rejected comment'
        }

        return <li
            key={comment.id}
        >
            {content}
        </li>
    })

    return <ul>
        {renderedComments}
    </ul>
}