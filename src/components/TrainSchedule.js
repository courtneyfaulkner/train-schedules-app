import { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';
import trainScheduleData from '../trainSchedule.json';

import './TrainSchedule.css';

const TrainSchedule = () => {
    const [nowTime, setNowTime] = useState(DateTime.local());

    const closestRows = trainScheduleData.reduce((closest, row) => {
        const arrivalTime = DateTime.fromFormat(row.arrivalTime, 'h:mm a');
        const timeDifference = Math.abs(arrivalTime.diff(nowTime, 'minutes').minutes);

        if (arrivalTime > nowTime && timeDifference >= 15) {
            if (!closest.length || timeDifference < closest[0].timeDifference) {
                return [{ row, timeDifference }];
            }

            if (timeDifference === closest[0].timeDifference) {
                return [...closest, { row, timeDifference }];
            }
        }

        return closest;
    }, []);

    const handleTimeChange = (event) => {
        const { value } = event.target;
        const [hours, minutes] = value.split(':');
        const newNowTime = DateTime.fromObject({
            hour: parseInt(hours),
            minute: parseInt(minutes),
            second: 0,
            millisecond: 0,
        });
        setNowTime(newNowTime);
    };

    const resetToCurrentTime = () => {
        setNowTime(DateTime.local());
    };

    const getNextTrainSummary = () => {
        if (closestRows.length > 0) {
            const nextArrivalTimes = closestRows.map((closest) => {
                const nextTrain = closest.row;
                const nextArrivalTime = DateTime.fromFormat(nextTrain.arrivalTime, 'h:mm a').toLocaleString(DateTime.TIME_SIMPLE);
                return nextArrivalTime;
            });
            return `Next train time: ${nextArrivalTimes[0]}`;
        }
        return 'No more trains for today';
    };

    return (
        <div className="train-schedule-container">
            <div className="time-controls">
                <input type="time" value={nowTime.toFormat('HH:mm')} onChange={handleTimeChange} />
                <button onClick={resetToCurrentTime}>Reset to Current Time</button>
            </div>

            <div className="train-summary">
                <h2>{getNextTrainSummary()}</h2>
            </div>

            <table className="train-schedule-table">
                <thead>
                    <tr>
                        <th>Arrival Time</th>
                        <th>Destination Time</th>
                        <th>Train Line</th>
                    </tr>
                </thead>
                <tbody>
                    {trainScheduleData.map((row, index) => {
                        const arrivalTime = DateTime.fromFormat(row.arrivalTime, 'h:mm a');
                        const isHighlighted = closestRows.some((closest) => closest.row.arrivalTime === row.arrivalTime && closest.row.trainLine === row.trainLine);
                        return (
                            <tr key={`${row.arrivalTime}-${row.trainLine}`} className={isHighlighted ? 'highlighted-row' : ''}>
                                <td>{arrivalTime.toLocaleString(DateTime.TIME_SIMPLE)}</td>
                                <td>{row.destinationTime}</td>
                                <td>{row.trainLine}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TrainSchedule;
