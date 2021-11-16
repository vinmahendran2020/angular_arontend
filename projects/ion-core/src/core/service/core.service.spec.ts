import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';
import { toArray } from 'rxjs/operators';

describe('CoreService', () => {
  let service: CoreService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    let store = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(
      mockSessionStorage.removeItem
    );
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CoreService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    sessionStorage.setItem(
      '__storage__',
      JSON.stringify({
        core: {
          authenticated: true,
          authenticating: false,
          error: '',
          principal: {
            user: 'accenturedev2',
            accessKeyId: 'ASIA4PUKIGILOTICZVWB',
            secretKey: 'PCNkzck41dYOIe2WO/Osu4R8JRpMsEdZmX8kkvkR',
            idToken:
              'eyJraWQiOiJCKzdWZXlzcCtxSGRjXC9wMEtaQjllUVJrRnlVV1wvdEFvOFk0TTMzaUp3UVk9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNDk5NjYzMy02YjlmLTQ5N2ItYmY2Ni1lZmZiMjAxYTk3OWUiLCJhdWQiOiI3bXFlOXRoOTI3bDNnZ3JoZGwzZDdzYzU3NSIsImV2ZW50X2lkIjoiNjg3ODFkNWUtMjE5MS00YzZkLTgzYWYtYmFiYmNhYTZkYWJkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTQ4Njc2MjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0t0bWxRa2xMbCIsIm5hbWUiOiJcdTIwMUNBY2NlbnR1cmVEZXYyXHUyMDFEIiwiY29nbml0bzp1c2VybmFtZSI6ImFjY2VudHVyZWRldjIiLCJleHAiOjE2MTQ4NzEyMjAsImlhdCI6MTYxNDg2NzYyMCwiY3VzdG9tOmVudGl0eSI6IjAwODgzOTkifQ.fy4X-XnNcjv7TqLAnHJJOolNa1K8ZR-wev4yCac3XSeLISyt2tfCQze2WxTN927md9wSiZ3k-saOklLw3uvRRfeH3O9P8u4unxZQKDgvhZAxxXBfineHGgmIFadCn5iK4N9Rt4auBnjwbo-GDUbh-DxMGW8G6f46QFD_c4jM6XL3XMXxv7NP8uPwptCJtEX5l6fNf3v0lUL5TCBlAlhmXnvwE7gyk0KDJKu0aU7QN5vIpfnYcnIRvpKt-p_vJ7GDCGR0-JLKpfuTgWqhmFqozKSpWNeUboPfH6Cyoj2A3J-ohNPyvDlgDk478-xWrvpThYiPTRMKTrmki6vzsRnfmQ',
            sessionToken:
              'IQoJb3JpZ2luX2VjEL7//////////wEaCXVzLWVhc3QtMiJIMEYCIQDnml3gvDfgQhM4ckXgKLm26PMkE2hX59mK10+c/EoISwIhALdkfCWJqIGGMV+TwtYVaO1l2xaX7MkIiHcNtUCIw9ncKs0ECNf//////////wEQABoMODU4MjA5NjYxNDYyIgz09yiXF8utTk5RYbcqoQQecULfwww4HwjUL6YIYoMueRM+SXDwqIJrcH0mb4CHFvFeLY99NK220Opm1LgkvDBS0gspo/UJHGHay7i9el++FHrUxskQ8GjIN8ajGc4THD0ZhqfPXujohFmY5VQZhjn3UFrA5XLzgyNHNCVBlKx+MVA8c4+NtsFfxwXf5puzitvWGyhwFe7NVMY4ZSvc2r0/xCTkkSFgaQK7vbBcJPI0Sqo2fEzYnjiAjIVcpS873jjrfxK23lNwUsEpeit7ul4QiQGRiHaMt4MqrkidtKAzXGWijdoBmZg8JoJTHTBt4x+AvHisKlNFNkyZl9THB8RWwlI9epXPY4mpz0hiAgAVEB+oka/veFkuJJy0Qo/h2Zb7YxFoxHQ/o/1H0M+7RhM7xFMJ1j6Dk2Gf8rKP0jfM5ecJI7jAI1CLgFQghZ2IeHkt1Fr94pW78JMZ0AYqT7GerN2pYBERY8g3Px9O+9QqusLDmOpi84vcT3DKnlXzKaXib5zrSsPOqGw8YO39Qql/imZ/7oCn9MjV7YO27kxVbETzhxxNViJO6jCTEXqnBrLGEja4hCNac1K+mrtmJTnOC9bE1Gu+nJRxKR/YPIA2v7vwFrMN9v7SsTeLX2/8DS2apNkI9N1lFWN2+CEFyupXhV6I1gH+hCOj1+rtS02XtLMiDs8YLjrpR9iH92W2OqT/G7eFcxI+GTb4YSk7lGr08y9KKmypAvToTFvgikEhqDCk2YOCBjqEAufTIdEZEmbyQMuAb5Xvsfv2stC2G1fK3FxAxx2kU1zQo+dOzB7hUGeCUoPy3shKk5wezl1UdwWQTyIEvus1Z5qGkJV9+VqXUgpufci0wz9gBeyBd8mWYrXu9IhcJHzHzjfTzbfb9BpcrNjiTkI6zz+OOyGy7l484r9HnguSTTysOcOntsGkel2XZcRRHiQ0A8La83Bp/ooFeW2vSRbAXLikVOOYtfT3caWeOUQug9cy/ft1bpV6knS3ISZ8h4/ZNlc/6XT5WkPqyb0K3xN0awrbv6/c9rynJWgwYZcUjIeN0BK8Iexu4cQUrASQ7zps0TfHkUQTeYDycWTPABZ+lCIOJyWz',
            refreshToken:
              'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.KVgNOpLQGmyBXB2EirWO3gqjgDAcigQgGknzuNcXoCUH4znaopLLlHf8PDNGUJdebLj2swEVtpbRHaYcAodBJgtDGHjwmw9L3GgZIUx4_K-vPFO9VnM8MWyeGvGW0Zxoh17KV6B3kiFRxF5iDay6zaIUAj4XqBXKgK2jEy3hf5MIEwSfzt58p-vY4di9NuEDr8km4HBaLNK5Z3TuO7MoLYwETh3JAFmL3_PszZ_Vyk5WxizQWmxORYtj09gUNEwfqlQqU3A5uxCIzlbzaC_uImxWm6h8AZqu5eyNx6WTatyMcBZyLl-Vu7qIGJeji-rgaUJOiawgBUCSUFXQMrmSpw.yiGn4VHyquQXnaDM.L_NlcjmjKrQZkXA_6cXwRzOH7YjKaIEaIv3wxsCBRftIvxQmE_i8DIxo8w17G4tZBeL5hp_R_xR0bKF6r6MwnSR_BrrgvK8D_Ou9NWac0kdUBWYqObe_5InuFkNYpHfOTHV9rBS3WeFkEgi3-i-nOXPq-YpfOX3pvdtU9Yy9JGQl_DUnZgMfLQwXx0SybHLOimgzj-LFTh0ymgLIdq6MyVLevLh8sM2O2RvJI6tt1DdTZZquEX-dpOPu0kkdYkpoEhi-5LhrO4WnuJJrRm1lVwaryy_7EBW7jBZSRQEcjR5X75lWWJd-B_3OnbH-DbWFiRtpf34VKiphhyR7VMUEHrPCqZp5AeYFE1rSJbK7YK1YSe8TY71Dxt8lp_Tu8we0LfIGRhmGPvpeCnBtkQIuzueW9TE8fOutR6q5NDaPg53YySWsjjYdO6zf8eE3d4vKrVAZekGuI02v3d8aWFlptdUGT7XSrnzrju-JqLmGWnnLCL65qRu_mz1zfWI9LiGDHjAdKJcoe7ZedewIm7gtRTtMaanEhRhIgRjPdPc4Pw2TW3P661zqU9BOjYLFtO-epZNEIO_prPlqRcYlxHW_r7xZb19mOI1KvQLd6eTNwIWYCL1xNdB9Y59-yCupEZuprKJ0bKacXPBY_2Lk-5xaYCZ1a0lrsbCBRCPM6C-RHqbWCyoYxHkfcMflp5ULM8FcJhpHowQqWO-MfMRI_Pcc16xvO_bs_8tFuU_54-vmlJ_f-RhlyYFyenLxcROtmN-H150PTrVr7Z_THuyVHruGpxRM0HgrSBFtTbjlfkbmOkKz_l2_EOC5Uw0hHghvk50x5-weMPR3vm70Ysh5cjHTnhmDIWt1T-QKxNbwdEmujSJA_ImsirKfjw0c6wjGffVQId_3eHen9L6h8KH1QfMnThaqUSg3awQthFa6_MR-MhnjcQ-9L2yzUEG7gHYjyPg3vq2jnq9kuV9wfAwlQfbTECl-6OpmuqcdZ9H4NE91C34fxN1L2oSY6P7DAWNZdChdxrl-wDfvorlDlqBN9_V3_JEZ31tlF_0j7nvMHDO6ghK7H14mvAHCsgGOUn68ild9BwCAfxg-LsouhqEivhpWtho4k7PX_BmcE_aWLfIhi2rkZ2RBOcu2jgmcxmAV13IXixfguJfD1yN388d1MeoJW1N7GxZo4CNS-Chv6A2OYTuriVv3AzNe3xo1NYPvjZPxq-V17VMOpnEMOaOoQ4_eZfbRzDTbg4JvPbxcL2vXV2pEjRuokE8939s1mwsseDwhV6CfLRNeCqVb3omhlw.cOQ79HiHUpK2duRBorOPyQ',
            accessToken:
              'eyJraWQiOiJHRXNNRGM0ZFwvM3dNRnhXY0tZMTFcL3FOeUZpTzdpUUUzb2xBd2xNR29yWUU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNDk5NjYzMy02YjlmLTQ5N2ItYmY2Ni1lZmZiMjAxYTk3OWUiLCJldmVudF9pZCI6IjY4NzgxZDVlLTIxOTEtNGM2ZC04M2FmLWJhYmJjYWE2ZGFiZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTQ4Njc2MjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0t0bWxRa2xMbCIsImV4cCI6MTYxNDg3MTIyMCwiaWF0IjoxNjE0ODY3NjIwLCJqdGkiOiJjZmNmM2MzZi00N2QzLTQwYzQtYTRhNi1iYjlmMGQ1OGIwZGMiLCJjbGllbnRfaWQiOiI3bXFlOXRoOTI3bDNnZ3JoZGwzZDdzYzU3NSIsInVzZXJuYW1lIjoiYWNjZW50dXJlZGV2MiJ9.eq_KsBZaP6P122_no0UE6R7T3R5YW7abnZ-N3qLXU-kYpA7qyiknh-Sgco0Lsu48XNVpEmZEtXUPu8CahmyLSt-ggiJcvnjx9exTlO2vT-8WRBfB1Or7xgkI5uCMs2ydqz_xfEiaXw7CV_05oQr31vVv72F7O_gsSSZ55h7jmeLnX0vQbh3W77bGAtz2VA9auv3rthCmrrviJGa28WtrfnpcEPAsCSvBBeJnyyFBpCgK8bkdY_gzzCbVBOvstkj50o5PS-DgqCZO4zvcgobThGTKrg-bah2r0mhquhoCfa0cgloX8ldQSO_0ZylccQdJWS9YMnsBjep3aAXsftwAPw',
          },
        },
      })
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check principal', () => {
    const principal = service.getPrincipal();
    expect(principal).toEqual({
      user: 'accenturedev2',
      accessKeyId: 'ASIA4PUKIGILOTICZVWB',
      secretKey: 'PCNkzck41dYOIe2WO/Osu4R8JRpMsEdZmX8kkvkR',
      idToken:
        'eyJraWQiOiJCKzdWZXlzcCtxSGRjXC9wMEtaQjllUVJrRnlVV1wvdEFvOFk0TTMzaUp3UVk9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNDk5NjYzMy02YjlmLTQ5N2ItYmY2Ni1lZmZiMjAxYTk3OWUiLCJhdWQiOiI3bXFlOXRoOTI3bDNnZ3JoZGwzZDdzYzU3NSIsImV2ZW50X2lkIjoiNjg3ODFkNWUtMjE5MS00YzZkLTgzYWYtYmFiYmNhYTZkYWJkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2MTQ4Njc2MjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0t0bWxRa2xMbCIsIm5hbWUiOiJcdTIwMUNBY2NlbnR1cmVEZXYyXHUyMDFEIiwiY29nbml0bzp1c2VybmFtZSI6ImFjY2VudHVyZWRldjIiLCJleHAiOjE2MTQ4NzEyMjAsImlhdCI6MTYxNDg2NzYyMCwiY3VzdG9tOmVudGl0eSI6IjAwODgzOTkifQ.fy4X-XnNcjv7TqLAnHJJOolNa1K8ZR-wev4yCac3XSeLISyt2tfCQze2WxTN927md9wSiZ3k-saOklLw3uvRRfeH3O9P8u4unxZQKDgvhZAxxXBfineHGgmIFadCn5iK4N9Rt4auBnjwbo-GDUbh-DxMGW8G6f46QFD_c4jM6XL3XMXxv7NP8uPwptCJtEX5l6fNf3v0lUL5TCBlAlhmXnvwE7gyk0KDJKu0aU7QN5vIpfnYcnIRvpKt-p_vJ7GDCGR0-JLKpfuTgWqhmFqozKSpWNeUboPfH6Cyoj2A3J-ohNPyvDlgDk478-xWrvpThYiPTRMKTrmki6vzsRnfmQ',
      sessionToken:
        'IQoJb3JpZ2luX2VjEL7//////////wEaCXVzLWVhc3QtMiJIMEYCIQDnml3gvDfgQhM4ckXgKLm26PMkE2hX59mK10+c/EoISwIhALdkfCWJqIGGMV+TwtYVaO1l2xaX7MkIiHcNtUCIw9ncKs0ECNf//////////wEQABoMODU4MjA5NjYxNDYyIgz09yiXF8utTk5RYbcqoQQecULfwww4HwjUL6YIYoMueRM+SXDwqIJrcH0mb4CHFvFeLY99NK220Opm1LgkvDBS0gspo/UJHGHay7i9el++FHrUxskQ8GjIN8ajGc4THD0ZhqfPXujohFmY5VQZhjn3UFrA5XLzgyNHNCVBlKx+MVA8c4+NtsFfxwXf5puzitvWGyhwFe7NVMY4ZSvc2r0/xCTkkSFgaQK7vbBcJPI0Sqo2fEzYnjiAjIVcpS873jjrfxK23lNwUsEpeit7ul4QiQGRiHaMt4MqrkidtKAzXGWijdoBmZg8JoJTHTBt4x+AvHisKlNFNkyZl9THB8RWwlI9epXPY4mpz0hiAgAVEB+oka/veFkuJJy0Qo/h2Zb7YxFoxHQ/o/1H0M+7RhM7xFMJ1j6Dk2Gf8rKP0jfM5ecJI7jAI1CLgFQghZ2IeHkt1Fr94pW78JMZ0AYqT7GerN2pYBERY8g3Px9O+9QqusLDmOpi84vcT3DKnlXzKaXib5zrSsPOqGw8YO39Qql/imZ/7oCn9MjV7YO27kxVbETzhxxNViJO6jCTEXqnBrLGEja4hCNac1K+mrtmJTnOC9bE1Gu+nJRxKR/YPIA2v7vwFrMN9v7SsTeLX2/8DS2apNkI9N1lFWN2+CEFyupXhV6I1gH+hCOj1+rtS02XtLMiDs8YLjrpR9iH92W2OqT/G7eFcxI+GTb4YSk7lGr08y9KKmypAvToTFvgikEhqDCk2YOCBjqEAufTIdEZEmbyQMuAb5Xvsfv2stC2G1fK3FxAxx2kU1zQo+dOzB7hUGeCUoPy3shKk5wezl1UdwWQTyIEvus1Z5qGkJV9+VqXUgpufci0wz9gBeyBd8mWYrXu9IhcJHzHzjfTzbfb9BpcrNjiTkI6zz+OOyGy7l484r9HnguSTTysOcOntsGkel2XZcRRHiQ0A8La83Bp/ooFeW2vSRbAXLikVOOYtfT3caWeOUQug9cy/ft1bpV6knS3ISZ8h4/ZNlc/6XT5WkPqyb0K3xN0awrbv6/c9rynJWgwYZcUjIeN0BK8Iexu4cQUrASQ7zps0TfHkUQTeYDycWTPABZ+lCIOJyWz',
      refreshToken:
        'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.KVgNOpLQGmyBXB2EirWO3gqjgDAcigQgGknzuNcXoCUH4znaopLLlHf8PDNGUJdebLj2swEVtpbRHaYcAodBJgtDGHjwmw9L3GgZIUx4_K-vPFO9VnM8MWyeGvGW0Zxoh17KV6B3kiFRxF5iDay6zaIUAj4XqBXKgK2jEy3hf5MIEwSfzt58p-vY4di9NuEDr8km4HBaLNK5Z3TuO7MoLYwETh3JAFmL3_PszZ_Vyk5WxizQWmxORYtj09gUNEwfqlQqU3A5uxCIzlbzaC_uImxWm6h8AZqu5eyNx6WTatyMcBZyLl-Vu7qIGJeji-rgaUJOiawgBUCSUFXQMrmSpw.yiGn4VHyquQXnaDM.L_NlcjmjKrQZkXA_6cXwRzOH7YjKaIEaIv3wxsCBRftIvxQmE_i8DIxo8w17G4tZBeL5hp_R_xR0bKF6r6MwnSR_BrrgvK8D_Ou9NWac0kdUBWYqObe_5InuFkNYpHfOTHV9rBS3WeFkEgi3-i-nOXPq-YpfOX3pvdtU9Yy9JGQl_DUnZgMfLQwXx0SybHLOimgzj-LFTh0ymgLIdq6MyVLevLh8sM2O2RvJI6tt1DdTZZquEX-dpOPu0kkdYkpoEhi-5LhrO4WnuJJrRm1lVwaryy_7EBW7jBZSRQEcjR5X75lWWJd-B_3OnbH-DbWFiRtpf34VKiphhyR7VMUEHrPCqZp5AeYFE1rSJbK7YK1YSe8TY71Dxt8lp_Tu8we0LfIGRhmGPvpeCnBtkQIuzueW9TE8fOutR6q5NDaPg53YySWsjjYdO6zf8eE3d4vKrVAZekGuI02v3d8aWFlptdUGT7XSrnzrju-JqLmGWnnLCL65qRu_mz1zfWI9LiGDHjAdKJcoe7ZedewIm7gtRTtMaanEhRhIgRjPdPc4Pw2TW3P661zqU9BOjYLFtO-epZNEIO_prPlqRcYlxHW_r7xZb19mOI1KvQLd6eTNwIWYCL1xNdB9Y59-yCupEZuprKJ0bKacXPBY_2Lk-5xaYCZ1a0lrsbCBRCPM6C-RHqbWCyoYxHkfcMflp5ULM8FcJhpHowQqWO-MfMRI_Pcc16xvO_bs_8tFuU_54-vmlJ_f-RhlyYFyenLxcROtmN-H150PTrVr7Z_THuyVHruGpxRM0HgrSBFtTbjlfkbmOkKz_l2_EOC5Uw0hHghvk50x5-weMPR3vm70Ysh5cjHTnhmDIWt1T-QKxNbwdEmujSJA_ImsirKfjw0c6wjGffVQId_3eHen9L6h8KH1QfMnThaqUSg3awQthFa6_MR-MhnjcQ-9L2yzUEG7gHYjyPg3vq2jnq9kuV9wfAwlQfbTECl-6OpmuqcdZ9H4NE91C34fxN1L2oSY6P7DAWNZdChdxrl-wDfvorlDlqBN9_V3_JEZ31tlF_0j7nvMHDO6ghK7H14mvAHCsgGOUn68ild9BwCAfxg-LsouhqEivhpWtho4k7PX_BmcE_aWLfIhi2rkZ2RBOcu2jgmcxmAV13IXixfguJfD1yN388d1MeoJW1N7GxZo4CNS-Chv6A2OYTuriVv3AzNe3xo1NYPvjZPxq-V17VMOpnEMOaOoQ4_eZfbRzDTbg4JvPbxcL2vXV2pEjRuokE8939s1mwsseDwhV6CfLRNeCqVb3omhlw.cOQ79HiHUpK2duRBorOPyQ',
      accessToken:
        'eyJraWQiOiJHRXNNRGM0ZFwvM3dNRnhXY0tZMTFcL3FOeUZpTzdpUUUzb2xBd2xNR29yWUU9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNDk5NjYzMy02YjlmLTQ5N2ItYmY2Ni1lZmZiMjAxYTk3OWUiLCJldmVudF9pZCI6IjY4NzgxZDVlLTIxOTEtNGM2ZC04M2FmLWJhYmJjYWE2ZGFiZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTQ4Njc2MjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0t0bWxRa2xMbCIsImV4cCI6MTYxNDg3MTIyMCwiaWF0IjoxNjE0ODY3NjIwLCJqdGkiOiJjZmNmM2MzZi00N2QzLTQwYzQtYTRhNi1iYjlmMGQ1OGIwZGMiLCJjbGllbnRfaWQiOiI3bXFlOXRoOTI3bDNnZ3JoZGwzZDdzYzU3NSIsInVzZXJuYW1lIjoiYWNjZW50dXJlZGV2MiJ9.eq_KsBZaP6P122_no0UE6R7T3R5YW7abnZ-N3qLXU-kYpA7qyiknh-Sgco0Lsu48XNVpEmZEtXUPu8CahmyLSt-ggiJcvnjx9exTlO2vT-8WRBfB1Or7xgkI5uCMs2ydqz_xfEiaXw7CV_05oQr31vVv72F7O_gsSSZ55h7jmeLnX0vQbh3W77bGAtz2VA9auv3rthCmrrviJGa28WtrfnpcEPAsCSvBBeJnyyFBpCgK8bkdY_gzzCbVBOvstkj50o5PS-DgqCZO4zvcgobThGTKrg-bah2r0mhquhoCfa0cgloX8ldQSO_0ZylccQdJWS9YMnsBjep3aAXsftwAPw',
    });
  });

  it('should check entity', () => {
    const entity = service.getEntityId();
    expect(entity).toBe('0088399');
  });

  it('should check null entity', () => {
    sessionStorage.removeItem('__storage__');
    const entity = service.getEntityId();
    expect(entity).toBeNull();
  });

  it('should verify login', (done) => {
    service.login('name', 'password').subscribe((principal) => {
      expect(principal).toBeTruthy();
      expect(principal).toEqual({
        accessKeyId: 'accessKeyId',
        secretKey: 'secretKey',
        idToken: 'idToken',
        sessionToken: 'sessionToken',
        refreshToken: 'refreshToken',
        user: 'name',
        accessToken: 'accessToken',
      });
      done();
    });
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'credentials',
      username: 'name',
      password: 'password',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.flush({
      data: {
        accessKeyId: 'accessKeyId',
        secretKey: 'secretKey',
        idToken: 'idToken',
        sessionToken: 'sessionToken',
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
      },
    });

    httpMock.verify();
  });

  it('should error login', (done) => {
    service.login('name', 'password').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'credentials',
      username: 'name',
      password: 'password',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.error('error happened' as any);

    httpMock.verify();
  });

  it('should error description login', (done) => {
    service.login('name', 'password').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'credentials',
      username: 'name',
      password: 'password',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });

  it('should verify refresh', (done) => {
    service.refresh('name', 'token').subscribe((principal) => {
      expect(principal).toBeTruthy();
      expect(principal).toEqual({
        accessKeyId: 'accessKeyId',
        secretKey: 'secretKey',
        idToken: 'idToken',
        sessionToken: 'sessionToken',
        refreshToken: 'refreshToken',
        user: 'name',
        accessToken: 'accessToken',
      });
      done();
    });
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'refresh',
      refreshToken: 'token',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.flush({
      data: {
        accessKeyId: 'accessKeyId',
        secretKey: 'secretKey',
        idToken: 'idToken',
        sessionToken: 'sessionToken',
        refreshToken: 'refreshToken',
        accessToken: 'accessToken',
      },
    });

    httpMock.verify();
  });

  it('should error refresh', (done) => {
    service.refresh('name', 'token').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'refresh',
      refreshToken: 'token',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.error('error happened' as any);

    httpMock.verify();
  });

  it('should error description refresh', (done) => {
    service.refresh('name', 'token').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('error happened');
        done();
      },
    });
    const request = httpMock.expectOne('./api/authentication/v1/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      authType: 'refresh',
      refreshToken: 'token',
    });
    expect(request.request.url).toMatch('./api/authentication/v1/login');
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });

  it('should get empty participants', (done) => {
    sessionStorage.removeItem('__storage__');
    service
      .getParticipants()
      .pipe(toArray())
      .subscribe((participants) => {
        expect(participants.length).toBe(1);
        expect(participants[0].length).toBe(0);
        done();
      });
  });

  it('should getParticipantIds success', (done) => {
    service.getParticipants().subscribe((participants) => {
      expect(participants).toEqual([
        {
          collGrpId: '1',
          createDate: '2021-01-11',
          lastUpdateDate: '2021-01-11',
          partId: '00005208',
          partMSegInd: 'Y',
          partName: 'Alpha Financial Group',
          status: 'ACTIVE',
          testPartInd: 'Y',
        },
      ]);
      done();
    });
    const request = httpMock.expectOne(
      './api/entity-master/v1/legal-entity/0088399'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toMatch(
      './api/entity-master/v1/legal-entity/0088399'
    );
    request.flush({
      participants: [
        {
          collGrpId: '1',
          createDate: '2021-01-11',
          lastUpdateDate: '2021-01-11',
          partId: '00005208',
          partMSegInd: 'Y',
          partName: 'Alpha Financial Group',
          status: 'ACTIVE',
          testPartInd: 'Y',
        },
      ],
    });

    httpMock.verify();
  });

  it('should getParticipant success', (done) => {
    service.getParticipant('00005208').subscribe((participant) => {
      expect(participant).toEqual({
        collGrpId: '1',
        createDate: '2021-01-11',
        lastUpdateDate: '2021-01-11',
        partId: '00005208',
        partMSegInd: 'Y',
        partName: 'Alpha Financial Group',
        status: 'ACTIVE',
        testPartInd: 'Y',
      });
      done();
    });
    const request = httpMock.expectOne(
      './api/entity-master/v1/participant/00005208'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toMatch(
      './api/entity-master/v1/participant/00005208'
    );
    request.flush({
      collGrpId: '1',
      createDate: '2021-01-11',
      lastUpdateDate: '2021-01-11',
      partId: '00005208',
      partMSegInd: 'Y',
      partName: 'Alpha Financial Group',
      status: 'ACTIVE',
      testPartInd: 'Y',
    });

    httpMock.verify();
  });

  it('should getParticipant error', (done) => {
    service.getParticipant('00001116').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this Participant ID');
        done();
      },
    });
    const request = httpMock.expectOne(
      './api/entity-master/v1/participant/00001116'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toMatch(
      './api/entity-master/v1/participant/00001116'
    );
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });

  it('should getCusip success', (done) => {
    service.getCusip('00005208').subscribe((cusip) => {
      expect(cusip).toEqual({
        collBlckInd: 'string',
        cusip: '00005208',
        hairCutVal: 'string',
        issuerId: 'string',
        issuerName: 'string',
        issuerTypeInd: 'string',
        lglPartId: 'string',
        name: 'string',
        price: 0,
        securityId: 'string',
        securityStatusCode: 'string',
        subIssueType: 'string',
        ticker: 'string',
        tstCusipInd: 'string',
        createTimeStamp: null,
        updateTimeStamp: null,
      });
      done();
    });
    const request = httpMock.expectOne(
      './api/security-master/v1/security/00005208'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toMatch(
      './api/security-master/v1/security/00005208'
    );
    request.flush({
      collBlckInd: 'string',
      cusip: '00005208',
      hairCutVal: 'string',
      issuerId: 'string',
      issuerName: 'string',
      issuerTypeInd: 'string',
      lglPartId: 'string',
      name: 'string',
      price: 0,
      securityId: 'string',
      securityStatusCode: 'string',
      subIssueType: 'string',
      ticker: 'string',
      tstCusipInd: 'string',
      createTimeStamp: null,
      updateTimeStamp: null,
    });

    httpMock.verify();
  });

  it('should getCusip error', (done) => {
    service.getCusip('00001116').subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error).toBe('No information found for this CUSIP');
        done();
      },
    });
    const request = httpMock.expectOne(
      './api/security-master/v1/security/00001116'
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.body).toBeNull();
    expect(request.request.url).toMatch(
      './api/security-master/v1/security/00001116'
    );
    request.error(
      new ErrorEvent('error', { error: { description: 'error happened' } })
    );

    httpMock.verify();
  });
});
