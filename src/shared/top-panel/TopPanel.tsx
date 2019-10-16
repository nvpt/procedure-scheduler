import React from 'react'
import cn from './topPanel.module.css'
import Button from 'react-bootstrap/Button'

interface TopPanelProps {
    title?: string
    buttonLabel?: string
    onAction?: () => void
}
interface TopPanelState {}

export default class TopPanel extends React.Component<
    TopPanelProps,
    TopPanelState
> {
    state = {}

    render() {
        const { title, onAction, buttonLabel = '' } = this.props

        return (
            <div className={cn.topPanel}>
                <div className={cn.panelContentWrap}>
                    <h2 className={cn.title}>{title}</h2>
                </div>
                {onAction ? (
                    <div className={cn.panelContentWrap}>
                        <div className={cn.buttonWrap}>
                            <Button
                                block
                                variant='outline-primary'
                                onClick={onAction}>
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
