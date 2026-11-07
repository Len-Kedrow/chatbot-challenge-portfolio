import React, { useEffect, useState } from 'react'
import "./LoadingTransition.css"

function LoadingTransition({ loadingComplete = false, setLoading }) {
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const [doorsOpen, setDoorsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimerFinished(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isTimerFinished && loadingComplete) {
                setDoorsOpen(true);
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isTimerFinished, loadingComplete]);

    return (
        <div id="loading-container">
            <div id={!doorsOpen ? "loading-left" : "loading-left-open"} />
            <div id={!doorsOpen ? "loading-right" : "loading-right-open"} />
        </div>
    )
}

export default LoadingTransition