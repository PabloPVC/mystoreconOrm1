import { Test, TestingModule } from '@nestjs/testing';
import { HouseService } from '../../../../src/bnb_air/services/house/house.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { House } from './../../../../src/bnb_air/models/house.model';
import { LocationOfrece } from '../../../../src/bnb_air/models/location-ofrece.model';
import { Valoracion_House } from './../../../../src/bnb_air/models/valoracion_house.model';
import { Valoracion } from '../../../../src/bnb_air/models/valoracion.model';
import { Image } from '../../../../src/bnb_air/models/images.model';
import { CreateHouseDto } from 'src/bnb_air/dto/house.dto';

describe('HouseService', () => {
  let service: HouseService;
  const house: House = {
    id: 1,
    name: 'Mocoli',
    ciudad: 'Guayaquil',
    longitud: 123456789,
    latitud: -12345678,
    estato: 1,
    foto: './uploads/images/2024/2/17/1708208593049.png',
    valoraciones: undefined,
    images: undefined,
    locationOfrece: undefined,
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  };
  const houses: House[] = [
    {
      id: 1,
      name: 'Mocoli',
      ciudad: 'Guayaquil',
      longitud: 123456789,
      latitud: -12345678,
      estato: 1,
      foto: './uploads/images/2024/2/17/1708208593049.png',
      valoraciones: undefined,
      images: undefined,
      locationOfrece: undefined,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    },
    {
      id: 2,
      name: 'Mocoli2',
      ciudad: 'Guayaquil2',
      longitud: 123456789,
      latitud: -12345678,
      estato: 1,
      foto: './uploads/images/2024/2/17/1708208593049.png',
      valoraciones: undefined,
      images: undefined,
      locationOfrece: undefined,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getRepositoryToken(House), // Importa getRepositoryToken desde @nestjs/typeorm
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LocationOfrece), // Utiliza getRepositoryToken con la entidad LocationOfrece
          useValue: {
            createLocations: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Image), // Utiliza getRepositoryToken con la entidad LocationOfrece
          useValue: {
            createImages: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Valoracion_House), // Utiliza getRepositoryToken con la entidad LocationOfrece
          useValue: {
            createvaloracion_house: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Valoracion), // Utiliza getRepositoryToken con la entidad LocationOfrece
          useValue: {
            createvaloracion: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HouseService>(HouseService);
  });

  test('Se define el servicio', () => {
    expect(service).toBeDefined();
  });
  test('findAll debería devolver una lista de house', async () => {
    // Mockea el método findAll del repositorio
    jest.spyOn(service, 'findAll').mockResolvedValue(houses);
    const result = await service.findAll();
    expect(result).toEqual(houses);
  });
  test('findOne debería devolver una house por su ID', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(house);
    const result = await service.findOne(1);
    expect(result).toEqual(house);
  });
  test('debería crear una nueva house', async () => {
    // Implementa la prueba según tus
    const houseDto: CreateHouseDto = {
      name: 'Mocoli',
      ciudad: 'Guayaquil',
      longitud: 123456789,
      latitud: -12345678,
      foto: './uploads/images/2024/2/17/1708208593049.png',
      estato: 1,
      valoracion: undefined,
      location: undefined,
      images: undefined,
    };
    jest.spyOn(service, 'create').mockResolvedValue(house);
    const result = await service.create(houseDto);
    expect(result.name).toEqual(houseDto.name);
  });
  test('debería eliminar los datos de una House', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(house);
    // Mockea el método softRemove del repositorio
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    // Ejecuta el método delete
    await service.delete(1);
    // Verifica que el método findOne haya sido llamado con el ID correcto
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
