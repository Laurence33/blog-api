export interface HttpResponse {
  headers: {
    contentType: string;
  };
  error: boolean;
  message: string;
  code: number;
  data?: any;
}

export function create500Response(message: string): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: true,
    message,
    code: 500,
  };
}
export function create400Response(message: string): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: true,
    message,
    code: 400,
  };
}

export function create401Response(): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: true,
    message: "You are unauthorized.",
    code: 401,
  };
}

export function create403Response(): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: true,
    message: "Forbidden",
    code: 403,
  };
}

export function create404Response(): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: true,
    message: "Not found",
    code: 404,
  };
}

export function create201Response(data: any): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: false,
    message: "Created",
    code: 201,
    data,
  };
}

export function create200Response(message: string, data: any): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: false,
    message,
    code: 200,
    data,
  };
}
export function create204Response(message: string, data: any): HttpResponse {
  return {
    headers: {
      contentType: "application/json",
    },
    error: false,
    message,
    code: 204,
    data,
  };
}
