import shippingData from '@/data/kerala-shipping-rates.json'

const KERALA_PREFIXES = shippingData.pincode_lookup.kerala_pincode_prefix

export type ServiceType = 'parcel' | 'speed_post' | 'parcel_contractual'

export interface ShippingEstimate {
  total: number
  label: string
  zone: 'local' | 'outstation'
  zoneLabel: string
  serviceName: string
  serviceCode: ServiceType
  deliveryTime: string
}

export interface ServiceOption {
  code: ServiceType
  name: string
  description: string
  total: number
  deliveryTime: string
}

/**
 * Check if a pincode belongs to Kerala
 */
export function isKeralaPincode(pincode: string): boolean {
  const prefix = pincode.substring(0, 3)
  return KERALA_PREFIXES.includes(prefix)
}

/**
 * Get the district name for a Kerala pincode
 */
export function getDistrictForPincode(pincode: string): string | null {
  for (const [district, data] of Object.entries(shippingData.districts)) {
    const districtData = data as { pincodes: string[] }
    if (districtData.pincodes.includes(pincode)) {
      return district
    }
  }
  return null
}

/**
 * Get the rate for a specific service, zone, and weight
 */
function getServiceRate(serviceKey: ServiceType, isKerala: boolean, weightGrams: number): number {
  const service = shippingData.services[serviceKey] as {
    local: { weight_slabs: { min_grams: number; max_grams: number; total: number }[]; additional_per_kg_above_5kg: number }
    interstate: { weight_slabs: { min_grams: number; max_grams: number; total: number }[]; additional_per_kg_above_5kg: number }
  }
  const zone = isKerala ? service.local : service.interstate
  const slabs = zone.weight_slabs

  // Default to 500g-1kg slab if no weight
  if (weightGrams <= 0) {
    return slabs[1]?.total || slabs[0].total
  }

  // Find matching slab
  for (const slab of slabs) {
    if (weightGrams >= slab.min_grams && weightGrams <= slab.max_grams) {
      return slab.total
    }
  }

  // Above 5kg
  const maxSlab = slabs[slabs.length - 1]
  const extraKg = Math.ceil((weightGrams - maxSlab.max_grams) / 1000)
  return maxSlab.total + (extraKg * zone.additional_per_kg_above_5kg)
}

/**
 * Get the weight label for a given weight in grams
 */
function getWeightLabel(weightGrams: number, serviceKey: ServiceType, isKerala: boolean): string {
  const service = shippingData.services[serviceKey] as {
    local: { weight_slabs: { min_grams: number; max_grams: number; label: string }[] }
    interstate: { weight_slabs: { min_grams: number; max_grams: number; label: string }[] }
  }
  const slabs = isKerala ? service.local.weight_slabs : service.interstate.weight_slabs

  if (weightGrams <= 0) return slabs[1]?.label || slabs[0].label

  for (const slab of slabs) {
    if (weightGrams >= slab.min_grams && weightGrams <= slab.max_grams) {
      return slab.label
    }
  }
  return `${(weightGrams / 1000).toFixed(1)}kg`
}

/**
 * Estimate shipping charge based on weight, pincode, and service type
 */
export function estimateShippingCharge(
  weightGrams: number,
  destinationPincode?: string,
  serviceType: ServiceType = 'parcel'
): ShippingEstimate {
  const isKerala = destinationPincode ? isKeralaPincode(destinationPincode) : true
  const total = getServiceRate(serviceType, isKerala, weightGrams)
  const label = getWeightLabel(weightGrams, serviceType, isKerala)

  const serviceInfo = shippingData.services[serviceType] as {
    name: string
    delivery_time_local: string
    delivery_time_interstate: string
  }

  return {
    total,
    label,
    zone: isKerala ? 'local' : 'outstation',
    zoneLabel: isKerala ? 'Within Kerala' : 'Outside Kerala',
    serviceName: serviceInfo.name,
    serviceCode: serviceType,
    deliveryTime: isKerala ? serviceInfo.delivery_time_local : serviceInfo.delivery_time_interstate
  }
}

/**
 * Get all 3 service options with prices for comparison
 */
export function getAllServiceOptions(
  weightGrams: number,
  destinationPincode?: string
): ServiceOption[] {
  const isKerala = destinationPincode ? isKeralaPincode(destinationPincode) : true
  const serviceKeys: ServiceType[] = ['parcel', 'speed_post', 'parcel_contractual']

  return serviceKeys.map(key => {
    const serviceInfo = shippingData.services[key] as {
      name: string
      description: string
      delivery_time_local: string
      delivery_time_interstate: string
    }
    return {
      code: key,
      name: serviceInfo.name,
      description: serviceInfo.description,
      total: getServiceRate(key, isKerala, weightGrams),
      deliveryTime: isKerala ? serviceInfo.delivery_time_local : serviceInfo.delivery_time_interstate
    }
  }).sort((a, b) => a.total - b.total) // Sort cheapest first
}

/**
 * Get all Kerala districts
 */
export function getKeralaDistricts(): string[] {
  return Object.keys(shippingData.districts)
}
