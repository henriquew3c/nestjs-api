import { RouteDriver } from './../../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {

    constructor(private prismaService: PrismaService) {}

    async processRoute(dto: {route_id: string, lat: number, lng: number}) {
        //upsert == update or insert.
        //Se já existir um registro com o route_id, ele atualiza, senão, ele cria um novo registro
        return await this.prismaService.routeDriver.upsert({
            include: {
                //inclui o relacionamento com a rota
                //já carrega os dados da rota para evitar um novo select
                //chamado de eager loading
                route: true
            },
            where: {
                route_id: dto.route_id
            },
            create: {
                route_id: dto.route_id,
                points: {
                    //set == adiciona um novo ponto
                    set: {
                        location: {
                            lat: dto.lat,
                            lng: dto.lng,
                        },
                    }
                }
            },
            update: {
                points: {
                    //push == sobrescreve tudo
                    push: {
                        location: {
                            lat: dto.lat,
                            lng: dto.lng,
                        },
                    }
                }
            },
        });
    }
}
