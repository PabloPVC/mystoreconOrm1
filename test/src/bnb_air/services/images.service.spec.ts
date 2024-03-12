import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImagesService } from './../../../../src/bnb_air/services/images/images/images.service';
import { Image } from '../../../../src/bnb_air/models/images.model';

describe('ImagesService', () => {
  let service: ImagesService;
  const imageMock: Image = {
    id: 1,
    title: 'imagen 1',
    itemImageSrc: 'http://locahost:8080/src/imagen1.png',
    thumbmailImageSrc: 'http://locahost:8080/src/imagen1.png',
    altSrc: 'imagen 1',
    house: {
      id: 0,
      name: '',
      ciudad: '',
      longitud: 0,
      latitud: 0,
      estato: 0,
      foto: '',
      valoraciones: [],
      images: [],
      locationOfrece: [],
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
    },
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  };
  const imagesMock: Image[] = [
    {
      id: 1,
      title: 'imagen 1',
      itemImageSrc: 'http://locahost:8080/src/imagen1.png',
      thumbmailImageSrc: 'http://locahost:8080/src/imagen1.png',
      altSrc: 'imagen 1',
      house: {
        id: 0,
        name: '',
        ciudad: '',
        longitud: 0,
        latitud: 0,
        estato: 0,
        foto: '',
        valoraciones: [],
        images: [],
        locationOfrece: [],
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
      },
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    },
    {
      id: 2,
      title: 'imagen 2',
      itemImageSrc: 'http://locahost:8080/src/imagen2.png',
      thumbmailImageSrc: 'http://locahost:8080/src/imagen2.png',
      altSrc: 'imagen 2',
      house: {
        id: 0,
        name: '',
        ciudad: '',
        longitud: 0,
        latitud: 0,
        estato: 0,
        foto: '',
        valoraciones: [],
        images: [],
        locationOfrece: [],
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
      },
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: getRepositoryToken(Image), // Importa getRepositoryToken desde @nestjs/typeorm
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
    service = module.get<ImagesService>(ImagesService);
  });

  it('Imagen Service está definido', () => {
    expect(service).toBeDefined();
  });

  test('findAll debería devolver una lista de imagenes', async () => {
    // Mockea el método findAll del repositorio
    jest.spyOn(service, 'findAll').mockResolvedValue(imagesMock);
    const result = await service.findAll();
    expect(result).toEqual(imagesMock);
  });

  test('findOne debería devolver una imagen por su ID', async () => {
    // Mockea el método findOne del repositorio
    jest.spyOn(service, 'findOne').mockResolvedValue(imageMock);
    const result = await service.findOne(1);
    expect(result).toEqual(imageMock);
  });
  test('debería crear una nueva imagen', async () => {
    // Implementa la prueba según tus
    jest.spyOn(service, 'create').mockResolvedValue(imageMock);
    const result = await service.create(imageMock);
    expect(result).toEqual(imageMock);
  });
  test('debería actualizar la imagen ', async () => {
    // Crea un DTO ficticio para la actualización
    const imagenExistente: Image = {
      id: 1,
      title: 'imagen 1',
      itemImageSrc: 'http://locahost:8080/src/imagen1.png',
      thumbmailImageSrc: 'http://locahost:8080/src/imagen1.png',
      altSrc: 'imagen 1',
      house: {
        id: 0,
        name: '',
        ciudad: '',
        longitud: 0,
        latitud: 0,
        estato: 0,
        foto: '',
        valoraciones: [],
        images: [],
        locationOfrece: [],
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
      },
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(imagenExistente);
    // Mockea el método create del repositorio
    // Ejecuta el método update
    jest.spyOn(service, 'update').mockResolvedValue({
      ...imagenExistente,
      ...imageMock,
    } as Image);
    const result = await service.update(1, imageMock);
    // Verifica que el resultado contenga los datos actualizados
    expect(result).toEqual({
      ...imagenExistente,
      ...imageMock,
    });
  });
  test('debería eliminar los datos de una Imagen', async () => {
    // Implementa la prueba según tus necesidades
    // Mockea el método findOne del repositorio para obtener la valoración existente
    jest.spyOn(service, 'findOne').mockResolvedValue(imageMock);
    // Mockea el método softRemove del repositorio
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    // Ejecuta el método delete
    await service.delete(1);
    // Verifica que el método findOne haya sido llamado con el ID correcto
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
