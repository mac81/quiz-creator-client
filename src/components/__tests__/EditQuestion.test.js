import React from 'react';
import renderer from 'react-test-renderer';

import { EditQuestion } from '../EditQuestion';

it('renders correctly', () => {
    const component = renderer.create(
        <EditQuestion item={{
            question: "Test",
            answers: [
                {
                    "answer": "Answer 1"
                }
            ]
        }}/>
    ).toJSON();
    expect(component).toMatchSnapshot();
});