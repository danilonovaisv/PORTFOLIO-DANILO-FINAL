import { logger } from '@/lib/logger';

describe('logger', () => {
  let originalEnv: string | undefined;
  let debugSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  const setNodeEnv = (val: string | undefined) => {
    (process.env as Record<string, string | undefined>).NODE_ENV = val;
  };

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    setNodeEnv(originalEnv);
    jest.restoreAllMocks();
  });

  it('emite logs de debug com prefixo timestamp e nível em ambiente non-production', () => {
    setNodeEnv('development');
    logger.debug('Mensagem de depuração', { key: 'val' });

    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy.mock.calls[0][0]).toMatch(/\[.*\] \[DEBUG\]/);
    expect(debugSpy.mock.calls[0][1]).toBe('Mensagem de depuração');
    expect(debugSpy.mock.calls[0][2]).toEqual({ key: 'val' });
  });

  it('emite logs de info com prefixo apropriado', () => {
    setNodeEnv('development');
    logger.info('Serviço inicializado');

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy.mock.calls[0][0]).toMatch(/\[.*\] \[INFO\]/);
    expect(infoSpy.mock.calls[0][1]).toBe('Serviço inicializado');
  });

  it('emite logs de warning com prefixo apropriado', () => {
    setNodeEnv('development');
    logger.warn('Alerta de fallback ativado');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toMatch(/\[.*\] \[WARN\]/);
    expect(warnSpy.mock.calls[0][1]).toBe('Alerta de fallback ativado');
  });

  it('emite logs de error mesmo quando em produção', () => {
    setNodeEnv('production');
    logger.error('Erro crítico no Sentinel Prime', new Error('Falha'));

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0]).toMatch(/\[.*\] \[ERROR\]/);
    expect(errorSpy.mock.calls[0][1]).toBe('Erro crítico no Sentinel Prime');
  });

  it('suprime debug, info e warn quando em produção', () => {
    setNodeEnv('production');
    logger.debug('Silenciado em prod');
    logger.info('Silenciado em prod');
    logger.warn('Silenciado em prod');

    expect(debugSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
