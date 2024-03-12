import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './models/house.model';
import { Valoracion } from './models/valoracion.model';
import { Image } from './models/images.model';
import { LocationOfrece } from './models/location-ofrece.model';
import { HouseService } from './services/house/house.service';
import { HouseController } from './controller/house/house.controller';
import { Valoracion_House } from './models/valoracion_house.model';
import { ValoracionesService } from './services/valoracion/valoraciones/valoraciones.service';
import { ValoracionesController } from './controller/valoracion/valoraciones/valoraciones.controller';
import { ImagesService } from './services/images/images/images.service';
import { ImageController } from './controller/images/image/image.controller';
import { LocationService } from './services/location/location.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      House,
      Valoracion,
      Image,
      LocationOfrece,
      Valoracion_House,
    ]),
  ],
  providers: [
    HouseService,
    ValoracionesService,
    ImagesService,
    LocationService,
  ],
  controllers: [HouseController, ValoracionesController, ImageController],
})
export class BnbAirModule {}
