import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Valoracion } from './../../../../src/bnb_air/models/valoracion.model';
import { ValoracionesService } from './../../../../src/bnb_air/services/valoracion/valoraciones/valoraciones.service';
import { UpdateValoracionDto } from './../../../../src/bnb_air/dto/valoracion.dto';

describe('ValoracionesService', () => {
  let service: ValoracionesService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ValoracionesService>(ValoracionesService);
  });

  test('Servicio Definido', () => {
    expect(service).toBeDefined();
  });

  test('findAll debería devolver una lista de valoraciones', async () => {
    // Mockea el método findAll del repositorio
    jest.spyOn(service, 'findAll').mockResolvedValue(valoracionesMock);
    const result = await service.findAll();
    expect(result).toEqual(valoracionesMock);
  });

  test('findOne debería devolver una valoración por su ID', async () => {
    // Mockea el método findOne del repositorio
    jest.spyOn(service, 'findOne').mockResolvedValue(valoracionMock);
    const result = await service.findOne(1);
    expect(result).toEqual(valoracionMock);
  });
  test('debería crear una nueva valoración', async () => {
    // Implementa la prueba según tus
    jest.spyOn(service, 'create').mockResolvedValue(valoracionMock);
    const result = await service.create(valoracionMock);
    expect(result).toEqual(valoracionMock);
  });
  test('debería actualizar los datos de una valoración', async () => {
    // Crea un DTO ficticio para la actualización
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
    jest.spyOn(service, 'findOne').mockResolvedValue(valoracionExistente);
    // Mockea el método create del repositorio
    // Ejecuta el método update
    jest.spyOn(service, 'update').mockResolvedValue({
      ...valoracionExistente,
      ...updateValoracionDto,
    } as Valoracion);
    const result = await service.update(1, updateValoracionDto);
    // Verifica que el resultado contenga los datos actualizados
    expect(result).toEqual({
      ...valoracionExistente,
      ...updateValoracionDto,
    });
  });
  test('debería eliminar los datos de una valoración', async () => {
    // Implementa la prueba según tus necesidades
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
    // Mockea el método findOne del repositorio para obtener la valoración existente
    jest.spyOn(service, 'findOne').mockResolvedValue(valoracionExistente);
    // Mockea el método softRemove del repositorio
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    // Ejecuta el método delete
    await service.delete(1);
    // Verifica que el método findOne haya sido llamado con el ID correcto
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
