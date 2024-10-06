import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { sanitizeFileName } from '#/shared/utils'
import { readdir } from 'fs/promises'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const userEmail = formData.get('userEmail') as string | null

    if (!file || !userEmail) {
      return NextResponse.json(
        { error: 'Thiếu file hoặc email người dùng' },
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Chỉ chấp nhận file PDF' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const sanitizedFile = sanitizeFileName(file.name)

    const fileName = `[${userEmail}]-${sanitizedFile}`
    const uploadDir = join(process.cwd(), 'public/uploads')
    const filePath = join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    const cvUrl = `/uploads/${fileName}`
    return NextResponse.json({ cvUrl }, { status: 200 })
  } catch (error) {
    console.error('Lỗi khi xử lý upload file:', error)
    return NextResponse.json({ error: 'Lỗi khi upload file' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userEmail = request.nextUrl.searchParams.get('email')

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Thiếu email người dùng' },
        { status: 400 }
      )
    }

    const uploadDir = join(process.cwd(), 'public/uploads')
    const files = await readdir(uploadDir)

    const userFiles = files.filter(
      (file) => file.startsWith(`[${userEmail}]`) && file.endsWith('.pdf')
    )

    const cvUrls = userFiles.map((file) => `/uploads/${file}`)

    return NextResponse.json({ cvUrls }, { status: 200 })
  } catch (error) {
    console.error('Lỗi khi lấy danh sách CV:', error)
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách CV' },
      { status: 500 }
    )
  }
}
