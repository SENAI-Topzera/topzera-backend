import moment from "moment";
import prismaClient from "../database/prismaClient";
import { CnhDTO, cnhToDTO } from "./cnh.types";

class CnhService {
  async findAll(): Promise<Array<void | CnhDTO>> {
    return await (
      await prismaClient.cNH.findMany()
    ).map((cnh) => {
      cnhToDTO(cnh);
    });
  }

  async saveCnh(dto: CnhDTO): Promise<CnhDTO> {
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

  async deleteCnhById(idCnh: number) {
    const cnh = await prismaClient.cNH.delete({
      where: {
        id_cnh: idCnh,
      },
    });

    return cnhToDTO(cnh);
  }

  async findCnhByUserId(userId: number): Promise<void | CnhDTO> {
    const cnh = await prismaClient.cNH.findFirst({
      where: {
        id_usuario: userId,
      },
    });

    if (cnh) return cnhToDTO(cnh);
    return;
  }
}

export default CnhService;
