import { throwIfOnlyInternalError } from './throwIfOnlyInternalError';

describe('throwIfOnlyInternalError tests', () => {
  it('testing interal 500 error', (done) => {
    const error$ = throwIfOnlyInternalError(
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
    const error$ = throwIfOnlyInternalError(
      {
        error: {
          error: {
            code: 400,
            description: 'Bad Request',
          },
        },
      },
      'Success Data'
    );

    error$.subscribe({
      next: (data) => {
        expect(data).toBe('Success Data');
        done();
      },
    });
  });

  it('testing empty error', (done) => {
    const error$ = throwIfOnlyInternalError(
      {
        error: {} as any,
      },
      'Success Data'
    );

    error$.subscribe({
      next: (data) => {
        expect(data).toBe('Success Data');
        done();
      },
    });
  });

  it('testing error message', (done) => {
    const error$ = throwIfOnlyInternalError(
      {
        error: 'Server Error',
      },
      'Success Data'
    );

    error$.subscribe({
      next: (data) => {
        expect(data).toBe('Success Data');
        done();
      },
    });
  });

  it('testing invalid error payload', (done) => {
    const error$ = throwIfOnlyInternalError({} as any, 'Success Data');

    error$.subscribe({
      next: (data) => {
        expect(data).toBe('Success Data');
        done();
      },
    });
  });
});
