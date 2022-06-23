import { rest } from 'msw';
import { setupServer } from 'msw/node';
import employeeDataMock from '../mocks/employee-data.mock';
import { API_URL } from '../urls';

const config = {
  responseDelay: 250,
  status: 200,
};

type Path = string;

/**
 * Sends a mock response when api url is requested.
 */
const setupMockServer = setupServer(
  rest.get(API_URL as Path, (req, res, ctx) => {
    return res(
      ctx.delay(config.responseDelay), // simulate delay
      ctx.status(config.status),
      ctx.json(employeeDataMock)
    );
  })
);

export default setupMockServer;
