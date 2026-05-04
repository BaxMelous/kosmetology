export interface ApiDictionaryItemDto {
  id: string;
  name: string;
}

export type DoctorSpecializationDto = ApiDictionaryItemDto;

export interface DoctorDirectionDto extends ApiDictionaryItemDto {
  receptionTypes: string[];
}

export interface ExternalDoctorDto {
  id: string;
  surname: string;
  name: string;
  patronymic: string | null;
  specializations: DoctorSpecializationDto[];
  directions: DoctorDirectionDto[];
  photoFileId: string | null;
  experience: string | null;
  description: string | null;
}

export interface MedDirectionDto extends ApiDictionaryItemDto {
  receptionTypes: string[];
}

export interface MedServicePriceDto {
  legalEntity: number | null;
  individuals: number | null;
}

export interface MedServiceDto {
  id: string;
  name: string;
  receptionType: string | null;
  isAvailableForOnlineBooking: boolean;
  description: string | null;
  preparation: string | null;
  applyReason: string | null;
  price: MedServicePriceDto | null;
}
