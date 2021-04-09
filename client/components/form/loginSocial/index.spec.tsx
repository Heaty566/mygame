import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Cookies from 'universal-cookie';

import config from './config';
import LoginSocial from '.';

jest.mock('universal-cookie', () => {
    const mCookie = {
        get: jest.fn(),
    };
    return jest.fn(() => mCookie);
});

describe('LoginSocial', () => {
    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            value: { reload: jest.fn() },
        });
    });
    it('Render Correct Default Type', async () => {
        const wrapper = render(<LoginSocial />);

        const button1 = await wrapper.findByTestId('loginsocial-continue-with-google');
        const button2 = await wrapper.findByTestId('loginsocial-continue-with-facebook');
        const button3 = await wrapper.findByTestId('loginsocial-continue-with-github');
        expect(button1).toBeDefined();
        expect(button2).toBeDefined();
        expect(button3).toBeDefined();

        expect(wrapper).toMatchInlineSnapshot(`
            Object {
              "asFragment": [Function],
              "baseElement": <body>
                <div>
                  <div
                    class="space-y-4"
                  >
                    <div
                      aria-hidden="true"
                      class="bg-gray-700 py-2 px-4 flex space-x-4 text-mercury font-semibold rounded-sm duration-300 hover:bg-gray-600 cursor-pointer"
                      data-testid="loginsocial-continue-with-google"
                    >
                      <svg
                        fill="none"
                        height="25"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          clip-path="url(#a)"
                        >
                          <path
                            d="m5.319 15.003-.835 3.12-3.054.064A11.946 11.946 0 0 1 0 12.5c0-1.99.484-3.867 1.342-5.519l2.719.499 1.19 2.702a7.133 7.133 0 0 0-.384 2.318c0 .88.16 1.725.452 2.503z"
                            fill="#FBBB00"
                          />
                          <path
                            d="M23.79 10.258a12.028 12.028 0 0 1-.053 4.747 11.998 11.998 0 0 1-4.225 6.853l-3.424-.175-.485-3.025a7.152 7.152 0 0 0 3.077-3.652h-6.416v-4.748H23.79z"
                            fill="#518EF8"
                          />
                          <path
                            d="M19.512 21.858h.001a11.95 11.95 0 0 1-7.512 2.642c-4.57 0-8.544-2.554-10.57-6.313l3.888-3.183a7.135 7.135 0 0 0 10.285 3.654l3.908 3.2z"
                            fill="#28B446"
                          />
                          <path
                            d="m19.66 3.263-3.888 3.182a7.137 7.137 0 0 0-10.52 3.737l-3.91-3.2A11.998 11.998 0 0 1 12 .5a11.95 11.95 0 0 1 7.66 2.763z"
                            fill="#F14336"
                          />
                        </g>
                        <defs>
                          <clippath
                            id="a"
                          >
                            <path
                              d="M0 0h24v24H0z"
                              fill="#fff"
                              transform="translate(0 .5)"
                            />
                          </clippath>
                        </defs>
                      </svg>
                      <span>
                        Continue with Google
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      class="bg-gray-700 py-2 px-4 flex space-x-4 text-mercury font-semibold rounded-sm duration-300 hover:bg-gray-600 cursor-pointer"
                      data-testid="loginsocial-continue-with-facebook"
                    >
                      <svg
                        fill="none"
                        height="25"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 24.5c6.627 0 12-5.373 12-12S18.627.5 12 .5 0 5.873 0 12.5s5.373 12 12 12z"
                          fill="#3B5998"
                        />
                        <path
                          d="M15.017 12.97h-2.141v7.844H9.632V12.97H8.089v-2.757h1.543V8.429c0-1.276.606-3.274 3.273-3.274l2.403.01v2.676h-1.744c-.286 0-.688.143-.688.752v1.622h2.425l-.284 2.755z"
                          fill="#fff"
                        />
                      </svg>
                      <span>
                        Continue with Facebook
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      class="bg-gray-700 py-2 px-4 flex space-x-4 text-mercury font-semibold rounded-sm duration-300 hover:bg-gray-600 cursor-pointer"
                      data-testid="loginsocial-continue-with-github"
                    >
                      <svg
                        fill="none"
                        height="23"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 0c6.63 0 12 5.28 12 11.792 0 5.21-3.438 9.63-8.205 11.188-.6.11-.82-.254-.82-.567 0-.28.01-1.022.015-2.005 3.338.71 4.042-1.582 4.042-1.582.546-1.361 1.335-1.725 1.335-1.725 1.087-.731-.084-.716-.084-.716-1.205.082-1.838 1.215-1.838 1.215-1.07 1.803-2.809 1.282-3.495.98-.108-.762-.417-1.281-.76-1.576 2.665-.295 5.466-1.31 5.466-5.827 0-1.287-.465-2.34-1.235-3.164.135-.298.54-1.497-.105-3.121 0 0-1.005-.316-3.3 1.209-.96-.262-1.98-.392-3-.398-1.02.006-2.04.136-3 .398-2.28-1.525-3.285-1.21-3.285-1.21-.645 1.625-.24 2.824-.12 3.122-.765.825-1.23 1.877-1.23 3.164 0 4.53 2.805 5.527 5.475 5.817-.42.354-.81 1.077-.81 2.182 0 1.578.015 2.846.015 3.229 0 .309-.21.678-.825.56C3.435 21.417 0 16.995 0 11.792 0 5.28 5.373 0 12 0z"
                          fill="#fff"
                        />
                      </svg>
                      <span>
                        Continue with Github
                      </span>
                    </div>
                  </div>
                </div>
              </body>,
              "container": <div>
                <div
                  class="space-y-4"
                >
                  <div
                    aria-hidden="true"
                    class="bg-gray-700 py-2 px-4 flex space-x-4 text-mercury font-semibold rounded-sm duration-300 hover:bg-gray-600 cursor-pointer"
                    data-testid="loginsocial-continue-with-google"
                  >
                    <svg
                      fill="none"
                      height="25"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        clip-path="url(#a)"
                      >
                        <path
                          d="m5.319 15.003-.835 3.12-3.054.064A11.946 11.946 0 0 1 0 12.5c0-1.99.484-3.867 1.342-5.519l2.719.499 1.19 2.702a7.133 7.133 0 0 0-.384 2.318c0 .88.16 1.725.452 2.503z"
                          fill="#FBBB00"
                        />
                        <path
                          d="M23.79 10.258a12.028 12.028 0 0 1-.053 4.747 11.998 11.998 0 0 1-4.225 6.853l-3.424-.175-.485-3.025a7.152 7.152 0 0 0 3.077-3.652h-6.416v-4.748H23.79z"
                          fill="#518EF8"
                        />
                        <path
                          d="M19.512 21.858h.001a11.95 11.95 0 0 1-7.512 2.642c-4.57 0-8.544-2.554-10.57-6.313l3.888-3.183a7.135 7.135 0 0 0 10.285 3.654l3.908 3.2z"
                          fill="#28B446"
                        />
                        <path
                          d="m19.66 3.263-3.888 3.182a7.137 7.137 0 0 0-10.52 3.737l-3.91-3.2A11.998 11.998 0 0 1 12 .5a11.95 11.95 0 0 1 7.66 2.763z"
                          fill="#F14336"
                        />
                      </g>
                      <defs>
                        <clippath
                          id="a"
                        >
                          <path
                            d="M0 0h24v24H0z"
                            fill="#fff"
                            transform="translate(0 .5)"
                          />
                        </clippath>
                      </defs>
                    </svg>
                    <span>
                      Continue with Google
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    class="bg-gray-700 py-2 px-4 flex space-x-4 text-mercury font-semibold rounded-sm duration-300 hover:bg-gray-600 cursor-pointer"
                    data-testid="loginsocial-continue-with-facebook"
                  >
                    <svg
                      fill="none"
                      height="25"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 24.5c6.627 0 12-5.373 12-12S18.627.5 12 .5 0 5.873 0 12.5s5.373 12 12 12z"
                        fill="#3B5998"
                      />
                      <path
                        d="M15.017 12.97h-2.141v7.844H9.632V12.97H8.089v-2.757h1.543V8.429c0-1.276.606-3.274 3.273-3.274l2.403.01v2.676h-1.744c-.286 0-.688.143-.688.752v1.622h2.425l-.284 2.755z"
                        fill="#fff"
                      />
                    </svg>
                    <span>
                      Continue with Facebook
                    </span>
                  </div>
                  <div
                    aria-hidden="true"
                    class="bg-gray-700 py-2 px-4 flex space-x-4 text-mercury font-semibold rounded-sm duration-300 hover:bg-gray-600 cursor-pointer"
                    data-testid="loginsocial-continue-with-github"
                  >
                    <svg
                      fill="none"
                      height="23"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0c6.63 0 12 5.28 12 11.792 0 5.21-3.438 9.63-8.205 11.188-.6.11-.82-.254-.82-.567 0-.28.01-1.022.015-2.005 3.338.71 4.042-1.582 4.042-1.582.546-1.361 1.335-1.725 1.335-1.725 1.087-.731-.084-.716-.084-.716-1.205.082-1.838 1.215-1.838 1.215-1.07 1.803-2.809 1.282-3.495.98-.108-.762-.417-1.281-.76-1.576 2.665-.295 5.466-1.31 5.466-5.827 0-1.287-.465-2.34-1.235-3.164.135-.298.54-1.497-.105-3.121 0 0-1.005-.316-3.3 1.209-.96-.262-1.98-.392-3-.398-1.02.006-2.04.136-3 .398-2.28-1.525-3.285-1.21-3.285-1.21-.645 1.625-.24 2.824-.12 3.122-.765.825-1.23 1.877-1.23 3.164 0 4.53 2.805 5.527 5.475 5.817-.42.354-.81 1.077-.81 2.182 0 1.578.015 2.846.015 3.229 0 .309-.21.678-.825.56C3.435 21.417 0 16.995 0 11.792 0 5.28 5.373 0 12 0z"
                        fill="#fff"
                      />
                    </svg>
                    <span>
                      Continue with Github
                    </span>
                  </div>
                </div>
              </div>,
              "debug": [Function],
              "findAllByAltText": [Function],
              "findAllByDisplayValue": [Function],
              "findAllByLabelText": [Function],
              "findAllByPlaceholderText": [Function],
              "findAllByRole": [Function],
              "findAllByTestId": [Function],
              "findAllByText": [Function],
              "findAllByTitle": [Function],
              "findByAltText": [Function],
              "findByDisplayValue": [Function],
              "findByLabelText": [Function],
              "findByPlaceholderText": [Function],
              "findByRole": [Function],
              "findByTestId": [Function],
              "findByText": [Function],
              "findByTitle": [Function],
              "getAllByAltText": [Function],
              "getAllByDisplayValue": [Function],
              "getAllByLabelText": [Function],
              "getAllByPlaceholderText": [Function],
              "getAllByRole": [Function],
              "getAllByTestId": [Function],
              "getAllByText": [Function],
              "getAllByTitle": [Function],
              "getByAltText": [Function],
              "getByDisplayValue": [Function],
              "getByLabelText": [Function],
              "getByPlaceholderText": [Function],
              "getByRole": [Function],
              "getByTestId": [Function],
              "getByText": [Function],
              "getByTitle": [Function],
              "queryAllByAltText": [Function],
              "queryAllByDisplayValue": [Function],
              "queryAllByLabelText": [Function],
              "queryAllByPlaceholderText": [Function],
              "queryAllByRole": [Function],
              "queryAllByTestId": [Function],
              "queryAllByText": [Function],
              "queryAllByTitle": [Function],
              "queryByAltText": [Function],
              "queryByDisplayValue": [Function],
              "queryByLabelText": [Function],
              "queryByPlaceholderText": [Function],
              "queryByRole": [Function],
              "queryByTestId": [Function],
              "queryByText": [Function],
              "queryByTitle": [Function],
              "rerender": [Function],
              "unmount": [Function],
            }
        `);
    });

    it('Test login user success', async () => {
        const cookies = new Cookies();
        const cookieSpy = jest.spyOn(cookies, 'get');
        cookieSpy.mockReturnValueOnce('12492525');
        global.open = jest.fn().mockReturnValue({ close: jest.fn() });

        jest.useFakeTimers();
        const wrapper = render(<LoginSocial />);
        const btn = await wrapper.findByText(config[0].label);
        fireEvent.click(btn);
        jest.advanceTimersByTime(1000);
        expect(global.open).toBeCalled();
    });

    it('Test login user false', async () => {
        global.open = jest.fn().mockReturnValue({ close: jest.fn() });
        jest.useFakeTimers();
        const wrapper = render(<LoginSocial />);
        const btn = await wrapper.findByText(config[0].label);
        fireEvent.click(btn);
        jest.advanceTimersByTime(1000);
        expect(global.open).toBeCalled();
    });
});
