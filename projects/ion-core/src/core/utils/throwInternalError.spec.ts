import { throwInternalError } from './throwInternalError';

describe('throwInternalError tests', () => {
  it('testing interal 500 error', (done) => {
    const error$ = throwInternalError(
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
        expect(error).toEqual({
          code: 500,
          description: 'Internal Server Error',
        });
        done();
      },
    });
  });

  it('testing bad request 400 error', (done) => {
    const error$ = throwInternalError(
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
        expect(error).toBe('Invalid Data');
        done();
      },
    });
  });

  it('testing empty error', (done) => {
    const error$ = throwInternalError(
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
    const error$ = throwInternalError(
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
    const error$ = throwInternalError({} as any, 'Invalid Data');

    error$.subscribe({
      error: (error) => {
        expect(error).toBe('Invalid Data');
        done();
      },
    });
  });
});
