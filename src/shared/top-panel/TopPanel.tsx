import React from 'react'
import cn from './topPanel.module.css'
import Button from 'react-bootstrap/Button'

interface TopPanelProps {
    title?: string
    buttonLabel?: string
    addAction?: () => void
}
interface TopPanelState {}

export default class TopPanel extends React.Component<
    TopPanelProps,
    TopPanelState
> {
    state = {}

    render() {
        const { title, addAction, buttonLabel = '' } = this.props

        return (
            <div className={cn.topPanel}>
                <div className={cn.panelContentWrap}>
                    <h2 className={cn.title}>{title}</h2>
                </div>
                {addAction ? (
                    <div className={cn.panelContentWrap}>
                        <div className={cn.buttonWrap}>
                            <Button
                                block
                                variant='outline-primary'
                                size='sm'
                                onClick={addAction}>
                                {`Add ${buttonLabel}`}
                            </Button>
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        )
    }
}
