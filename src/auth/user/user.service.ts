import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { Cycle, CycleDto } from 'src/school';
import { Repository } from 'typeorm';
import { BranchDto } from '../branch/dto';
import { Branch } from '../branch/entities/branch.entity';
import { SessionDto } from './dto/session.dto';
import { SignInInput } from './dto/sign-in.input';
import { SignUpInput } from './dto/sign-up.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    @InjectRepository(Branch)
    private readonly _branchRepository: Repository<Branch>,
    @InjectRepository(Cycle)
    private readonly _cycleRepository: Repository<Cycle>,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * Inicia sesión en el sistema con un usuario existente.
   *
   * @param {SignInInput} input - Los datos necesarios para iniciar sesión.
   * @returns {Promise<SessionDto>} - Una promesa que resuelve con los datos de la sesión del usuario.
   * @throws {ConflictException} - Si el usuario no existe o las credenciales son inválidas.
   */
  async signIn(input: SignInInput): Promise<SessionDto> {
    input.username = input.username.trim().toLowerCase();

    const user = await this._userRepository.findOne({
      where: { username: input.username },
    });

    if (!user) {
      throw new ConflictException('User does not exist');
    }

    const isValid = await compare(input.password, user.password);

    if (!isValid) {
      throw new ConflictException('Invalid credentials');
    }

    return this._sign(user);
  }

  /**
   * Crea un nuevo usuario en el sistema.
   *
   * @param {SignUpInput} input - Los datos necesarios para crear un nuevo usuario.
   * @returns {Promise<SessionDto>} - Una promesa que resuelve con los datos de la sesión del usuario creado.
   * @throws {ConflictException} - Si el nombre de usuario ya existe en el sistema.
   */
  async signUp(input: SignUpInput): Promise<SessionDto> {
    input.username = input.username.trim().toLowerCase();
    input.email = input.email.trim().toLowerCase();

    const existingUser = await this._userRepository.findOne({
      where: { username: input.username },
      withDeleted: true,
    });

    if (!!existingUser) {
      throw new ConflictException('User already exists');
    }

    const salt = await genSalt(10);
    input.password = await hash(input.password, salt);

    const user = await this._userRepository.save(input);

    return this._sign(user);
  }

  async update(id: string, input: UpdateUserInput) {
    if (input?.username) {
      input.username = input.username.trim().toLowerCase();
    }

    if (input?.email) {
      input.email = input.email.trim().toLowerCase();
    }

    const user = await this._userRepository.save({
      id,
      ...input,
    });

    return instanceToPlain<UserDto>(user) as UserDto;
  }

  /**
   * @private
   * @method _sign
   *
   * @description
   * Este método asíncrono genera un token JWT para un usuario dado y devuelve un objeto que contiene el payload, el token,
   * y las fechas de expiración y emisión del token.
   *
   * @param {User} user - El usuario para el cual se generará el token.
   *
   * @returns {Promise<SessionDto>} Un objeto que contiene el payload, el token JWT, y las fechas de expiración y emisión del token.
   */
  private async _sign(user: User): Promise<SessionDto> {
    const { username, id } = user;

    const token = await this._jwtService.signAsync({ id, username });

    const decode = this._jwtService.decode(token);

    const exp = new Date(decode.exp * 1000);
    const iat = new Date(decode.iat * 1000);

    const branch = await this._findBranchById(user.branchId);
    const cycle = await this._findCycleById(user.cycleId);

    return {
      id,
      token,
      exp,
      iat,
      username,
      branch,
      cycle,
    };
  }

  /**
   * Busca una sucursal por su identificador único.
   *
   * @param id - El identificador único de la sucursal. Puede ser una cadena o `null`.
   * @returns Una promesa que resuelve a un objeto `BranchDto` si se encuentra la sucursal,
   *          o `null` si no se encuentra o si el `id` es `null`.
   */
  private async _findBranchById(id: string | null): Promise<BranchDto | null> {
    if (id) {
      const currentBranch = await this._branchRepository.findOne({
        where: { id },
      });

      if (currentBranch) {
        return instanceToPlain<BranchDto>(currentBranch) as BranchDto;
      }
    }

    return null;
  }

  /**
   * Busca un ciclo escolar por su identificador único.
   *
   * @param id - El identificador único del ciclo. Puede ser una cadena o `null`.
   * @returns Una promesa que resuelve a un objeto `CycleDto` si se encuentra la sucursal,
   *          o `null` si no se encuentra o si el `id` es `null`.
   */
  private async _findCycleById(id: string | null): Promise<CycleDto | null> {
    if (id) {
      const currentCycle = await this._cycleRepository.findOne({
        where: { id },
      });

      if (currentCycle) {
        return instanceToPlain<CycleDto>(currentCycle) as CycleDto;
      }
    }

    return null;
  }
}
