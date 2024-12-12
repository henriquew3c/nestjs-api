import { repl } from "@nestjs/core";
import { AppModule } from "./app.module";

//a função chamada repl permite que rode a aplicação no terminal. Aceitando comandos do terminal.
//a função bootstrap é chamada para rodar a aplicação.
//comando para subir a aplicação neste entry point: npm run start:dev -- --entryFile=repl
async function bootstrap() {
  await repl(AppModule);
}
bootstrap();
