import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ValoracionesController } from '../../../../src/bnb_air/controller/valoracion/valoraciones/valoraciones.controller';
import { ValoracionesService } from '../../../../src/bnb_air/services/valoracion/valoraciones/valoraciones.service';
import { Valoracion } from '../../../../src/bnb_air/models/valoracion.model';
import { UpdateValoracionDto } from '../../../../src/bnb_air/dto/valoracion.dto';

describe('ValoracionesController', () => {
  let controller: ValoracionesController;
  let service: ValoracionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValoracionesController],
      providers: [
        ValoracionesService,
        {
          provide: getRepositoryToken(Valoracion), // Importa getRepositoryToken desde @nestjs/typeorm
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ValoracionesController>(ValoracionesController);
    service = module.get<ValoracionesService>(ValoracionesService);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });
  test('findAll return all items', async () => {
    const valoracionesMock: Valoracion[] = [
      {
        id: 1,
        title: 'Valoración 1',
        valor: 4.5,
        icon: 'star',
        valoracion_house: [],
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
      {
        id: 2,
        title: 'Valoración 2',
        valor: 4.6,
        icon: 'star',
        valoracion_house: [],
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ];
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(valoracionesMock));

    expect(await controller.findAll()).toBe(valoracionesMock);
  });

  test('create and return one of item', async () => {
    const valoracionMock: Valoracion = {
      id: 1,
      title: 'Valoración 1',
      valor: 4.5,
      icon: 'star',
      valoracion_house: [],
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };

    jest
      .spyOn(service, 'create')
      .mockImplementation(() => Promise.resolve(valoracionMock));

    expect(await controller.create(valoracionMock)).toBe(valoracionMock);
  });

  test('findOne return one of items', async () => {
    const valoracionMock: Valoracion = {
      id: 1,
      title: 'Valoración 1',
      valor: 4.5,
      icon: 'star',
      valoracion_house: [],
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(valoracionMock));
    expect(await controller.findOne(1)).toBe(valoracionMock);
  });
  test('Se actualiza un Item item', async () => {
    const updateValoracionDto: UpdateValoracionDto = {
      title: 'Valoración Actualizada',
      valor: 4.5,
      icon: 'star',
    };
    const valoracionExistente: Valoracion = {
      id: 1,
      title: 'Valoración Original',
      valor: 3.0,
      icon: 'heart',
      valoracion_house: [],
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };

    jest
      .spyOn(service, 'update')
      .mockImplementation(() => Promise.resolve(valoracionExistente));

    expect(await controller.update(1, updateValoracionDto)).toBe(
      valoracionExistente,
    );
  });
  test('delete an item', async () => {
    const id = 1;

    jest.spyOn(service, 'delete').mockImplementation(() => Promise.resolve());

    await controller.delete(id);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
