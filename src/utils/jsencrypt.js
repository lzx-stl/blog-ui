import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDLPdUdozTE1qObpdrjWSfh9rWg\n' +
  'pXfeGViRjar0QvTUw/TJeVxRbjjID0Tq1EWNPWRno77ot2JQ+pzxv59q0V4EmF7r\n' +
  'Hd1fosazfz7d4Mu5IGrv1HyrMdcKkdko+UOrsYjxLo1Rq59gbTSsJRVUuOJTziLN\n' +
  'IznPNsHPo4SHhd5hvQIDAQAB'


const privateKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMs91R2jNMTWo5ul\n' +
  '2uNZJ+H2taCld94ZWJGNqvRC9NTD9Ml5XFFuOMgPROrURY09ZGejvui3YlD6nPG/\n' +
  'n2rRXgSYXusd3V+ixrN/Pt3gy7kgau/UfKsx1wqR2Sj5Q6uxiPEujVGrn2BtNKwl\n' +
  'FVS44lPOIs0jOc82wc+jhIeF3mG9AgMBAAECgYA3v/FKnO8no1zjoB4nyNf40szF\n' +
  'kT4NLVSvMHYZZJh2GH54GZMqPxrSPeYAqFOfx5xYFYGTomIUpnoQkiivi1jHWqYE\n' +
  '06F3w1qDukIVK0JLJLZhKbYlZV5RdYIJRz6YOzjkg+CU0Ki78PWm8KF5vB+/LdOl\n' +
  'ofS2IJUJnWbPJp27YQJBAO5V0axvdBA2O3SlcT/90G0f0UlZpuavdwW3to6TjReA\n' +
  'XiFe9HyLrVb5Bv4Fy0Ur2qenSqoEhCRc+2vC2y5sJhkCQQDaTiT39FR0q3QOrL4U\n' +
  'FpJ11q1b/yEfgwQ7+oCf66NA+N74bnNEcandCPcER5ijU21EAVzw/mGJ/y2Vm+2g\n' +
  'uqVFAkBx9UbUFFaCievT0mdcGZhXFSeU0vEizDM04KrBcXu9CPv5KNXt1zuCon/d\n' +
  'ZhfTcyyRjUP+Fzq3yF3PINR8VenBAkEAhBd6qQoPPFUuMV722KLb1i+i0CKtASs+\n' +
  'mag2wg1LyBmOmRYD6ys3lAZDqTRFOLZXTCni+fOCQ4TDKV6jR3kIXQJBAMnJFLd+\n' +
  '1MQqhGzQFsiHDSjFavW25GXbO/uF9mD7XvtohNZCpwGToyJ6dvzhyjpp9psLGa0+\n' +
  'b5GZdFD7S0uulsk=\n'

// 加密
export function encrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

