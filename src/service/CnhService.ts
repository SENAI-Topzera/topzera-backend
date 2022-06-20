import moment from "moment";
import prismaClient from "../database/prismaClient";
import { CnhDTO, cnhToDTO } from "../types/cnh.type";

class CnhService {
  async findAll() {
    return await prismaClient.cNH.findMany();
  }

  async saveCnh(dto: CnhDTO) {
    const cnh = await prismaClient.cNH.create({
      data: {
        data_nasc: moment(dto.bornDate).format(),
        rg: dto.rg,
        num_registro: dto.registerNumber,
        num_cnh: dto.cnh,
        data_validade: moment(dto.dueDate).format(),
        estado: dto.state,
        id_usuario: dto.userId,
      },
    });
    return cnhToDTO(cnh);
  }

  async getCnhById(idCnh: number) {
    return await prismaClient.cNH.findFirst({
      where: {
        id_cnh: idCnh,
      },
    });
  }
}

export default CnhService;