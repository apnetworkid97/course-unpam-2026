import {
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';

export function handleRpcError(error: unknown): never {
    const message =(error as any)?.shortMessage || (error as any)?.message || String(error);
    // console.log(error)
    const lower = message.toLowerCase();

    if (lower.includes('timeout')) {
      throw new ServiceUnavailableException(
        `RPC timeout. Silakan coba beberapa saat lagi.`,
      );
    }

    if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed') || lower.includes('connection')) {
      throw new ServiceUnavailableException(
        `Tidak dapat terhubung ke blockchain RPC.`,
      );
    }

    throw new InternalServerErrorException(
      `Terjadi kesalahan saat membaca data blockchain.`,
    );
}
