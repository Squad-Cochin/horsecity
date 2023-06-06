import React from 'react';
import { render } from 'react-dom';
import TestDesign1 from './pages/designs/TestDesign1/TestDesign1';

describe('TestDesign1', () => {
it('renders without crashing', () => {
const div = document.createElement('div');
render(<TestDesign1 />, div);
});
});