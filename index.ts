import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
	"/",
	async (req: Request, res: Response): Promise<Response> => {
		return res.status(200).send({
			message: "Hello World!",
		});
	}
);

// function Controller() {
//   return function decorator(Class) {
//     return (...args) => {
//       console.log(`Arguments for ${name}: args`);
//       // return new Class(...args);
//     };
//   }
// }

function Get(path: string) {
  return (target: any, propertyKey: string) => {
		app.get(path, (req: Request, res: Response) => {
				res.send({
					message: target[propertyKey](),
				});
			}
		);
  };
}

interface user {
	name: string,
	gender?: 'male'
}

class UserController {
  @Get("/users")
  getUsers(): user[] {
    return [{name: 'seven'}];
  }
}

try {
	app.listen(port, (): void => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occured: ${error.message}`);
}
