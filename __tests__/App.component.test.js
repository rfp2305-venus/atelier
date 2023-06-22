import renderer from 'react-test-renderer';
import App from '../src/components/App.jsx';

describe('App Component', () => {
  beforeAll(() => {
    console.log('Testing App Component');
  })
  afterAll(() => {
    console.log('Done Testing App Component');
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(<App />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})