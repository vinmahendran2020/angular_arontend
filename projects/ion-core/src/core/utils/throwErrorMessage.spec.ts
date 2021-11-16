import { throwErrorMessage } from './throwErrorMessage';

describe('throwErrorMessage tests', () => {
  it('testing interal 500 error', (done) => {
    const error$ = throwErrorMessage(
      {
        error: {
          error: {
            code: 500,
            description: 'Internal Server Error',
          },
        },
      },
      '500 Internal Server Error'
    );

    error$.subscribe({
      error: (error) => {
        expect(error).toBe('Internal Server Error');
        done();
      },
    });
  });

  it('testing bad request 400 error', (done) => {
    const error$ = throwErrorMessage(
      {
        error: {
          error: {
            code: 400,
            description: 'Bad Request',
          },
        },
      },
      'Invalid Data'
    );

    error$.subscribe({
      error: (error) => {
        expect(error).toBe('Bad Request');
        done();
      },
    });
  });

  it('testing empty error', (done) => {
    const error$ = throwErrorMessage(
      {
        error: {} as any,
      },
      'Invalid Data'
    );

    error$.subscribe({
      error: (error) => {
        expect(error).toBe('Invalid Data');
        done();
      },
    });
  });

  it('testing error message', (done) => {
    const error$ = throwErrorMessage(
      {
        error: 'Server Error',
      },
      'Invalid Data'
    );

    error$.subscribe({
      error: (error) => {
        expect(error).toBe('Server Error');
        done();
      },
    });
  });

  it('testing invalid error payload', (done) => {
    const error$ = throwErrorMessage({} as any, 'Invalid Data');

    error$.subscribe({
      error: (error) => {
        expect(error).toBe('Invalid Data');
        done();
      },
    });
  });
});
