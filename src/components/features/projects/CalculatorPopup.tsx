'use client';

import { useState } from 'react';
import { RemoveIcon } from '@/public/icons';
import { Popup } from '@/components/shared/popups';
import { Button } from '@/components/shared/buttons';
import { Input } from '@/components/shared/textfields';

const CalculatorPopup = (
    props: PopupProps & { type: 'calculator' | 'numpad' }
) => {
    const [value, setValue] = useState<string>('');
    const calculatorBtns = [
        'CLR',
        ')',
        '(',
        '/',
        7,
        8,
        9,
        'x',
        4,
        5,
        6,
        '-',
        3,
        2,
        1,
        '+',
        '.',
        0,
        '',
        '='
    ];
    const percentBtns = [9, 8, 7, 6, 5, 4, 3, 2, 1, '.', 0, ''];
    const [operator, setOperator] = useState('');
    const [savedValue, setSavedValue] = useState('');

    const calculate = (btn: string) => {
        if (operator === '+') {
            setValue(btn);
            setOperator('');
        } else if (operator === '-') {
            setValue(btn);
            setOperator('');
        } else if (operator === '/') {
            setValue(btn);
            setOperator('');
        } else if (operator === '*') {
            setValue(btn);
            setOperator('');
        }
    };

    const onClickBtn = (btn: string) => {
        if (btn === '+') {
            setSavedValue(savedValue.concat(value));
            setOperator(btn);
        } else if (btn === '-') {
            setSavedValue(savedValue.concat(value));
            setOperator(btn);
        } else if (btn === '/') {
            setSavedValue(savedValue.concat(value));
            setOperator(btn);
        } else if (btn === '*') {
            setSavedValue(savedValue.concat(value));
            setOperator(btn);
        } else {
            if (operator) calculate(btn);
            else setValue(value.concat(btn));
        }
    };

    const renderCalculatorBtns = (btn: string | number, key: number) => {
        const index = key + 1;
        if (index % 4 === 0) {
            return (
                <Button
                    key={btn}
                    type="button"
                    value={String(btn)}
                    onMouseDown={() => onClickBtn(String(btn))}
                    className="bg-[#6C98E2] text-white text-[22px] h-[55px] hover:bg-primary"
                />
            );
        } else {
            return (
                <Button
                    key={btn}
                    type="button"
                    value={String(btn)}
                    icon={
                        btn === '' ? (
                            <RemoveIcon className="w-[18px] h-[18px] text-black" />
                        ) : (
                            ''
                        )
                    }
                    onMouseDown={() => onClickBtn(String(btn))}
                    className="bg-transparent text-black text-[16px] text-center h-[55px] hover:bg-hover-secondary"
                />
            );
        }
    };

    const Calculator = () => (
        <div className="grid grid-cols-4 place-content-center py-[12px] gap-[12px]">
            {calculatorBtns.map((item, key) => renderCalculatorBtns(item, key))}
        </div>
    );

    const Percent = () => (
        <div className="grid grid-cols-3 place-content-center py-[12px] gap-[12px]">
            {percentBtns.map((item) => (
                <Button
                    key={item}
                    value={String(item)}
                    icon={
                        item === '' ? (
                            <RemoveIcon className="w-[18px] h-[18px] text-black" />
                        ) : (
                            <div />
                        )
                    }
                    onClick={() => setValue(String(item))}
                    className="h-[55px] bg-transparent text-black text-[22px] hover:bg-hover-secondary"
                />
            ))}
        </div>
    );

    return (
        <Popup {...props}>
            <div className="w-[230px] bg-white">
                <Input
                    autoFocus
                    variant="primary"
                    extraType={props.type}
                    value={value}
                    onChange={(evt) => setValue(evt.target.value)}
                />
                {props.type === 'calculator' ? <Calculator /> : <Percent />}
                <Button
                    value="Done"
                    className="w-full bg-secondary text-primary hover:bg-hover-secondary"
                />
            </div>
        </Popup>
    );
};

export default CalculatorPopup;
