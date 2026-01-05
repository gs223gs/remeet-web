import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { RemeetFullLogo } from "@/components/util/RemeetFullLogo";
import { RemeetIcon } from "@/components/util/RemeetIcon";
import { routes } from "@/util/routes";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-orange-50 rounded-full">
              <p className="text-orange-600 text-sm font-medium">
                〜ミートアップに参加する全ての人へ〜
              </p>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              もう忘れない
            </h1>

            <p className="text-2xl sm:text-3xl text-gray-600 mb-8 font-medium">
              出会った人を記録
            </p>

            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              ミートアップで出会った人の情報を簡単に記録・管理。名前、仕事、会話内容、SNSリンクまで一元管理できます。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                className="bg-orange-500 text-white hover:bg-orange-500/90"
                asChild
              >
                <Link href={routes.login()}>今すぐ始める</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="vision" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-12">
              Vision
            </h2>

            <div className="space-y-8 text-left bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                ミートアップで仲良くなったあの人の得意なことはなんだったっけ...
              </p>

              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                そういう経験はありませんか？
              </p>

              <p className="text-xl sm:text-2xl text-orange-600 font-semibold leading-relaxed">
                ReMeetを使えばもう2度とそんな思いをすることはありません
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                機能紹介
              </h2>
              <p className="text-lg text-gray-600">
                ReMeetの主要な機能をご紹介します
              </p>
            </div>

            <div className="space-y-32">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-2 bg-orange-100 rounded-full">
                    <span className="text-orange-600 font-semibold text-sm">
                      機能 01
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    出会った人を記録
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    名前は？どんな仕事をしている？ミートアップで出会った人の基本情報を素早く記録できます。会社名や役職も一緒に保存して、後から簡単に思い出せます。
                  </p>
                </div>
                <div className="">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image
                      src="/rootpage/contactsViewSmall.png"
                      width={1000}
                      height={1000}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
                <div className="lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                    <span className="text-orange-600 font-semibold text-sm">
                      機能 02
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    特徴やリンクを記録
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    タグをつけたり、各種リンクを一元管理。Twitter、GitHub、個人サイトなど、複数のSNSリンクをまとめて保存できます。その人の特徴も自由にタグ付けできます。
                  </p>
                </div>

                <div className="">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image
                      src="/rootpage/contactsForm2.png"
                      width={1000}
                      height={1000}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
              </div>

              <div className=" items-center justify-between gap-12">
                <div className="">
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <p className="text-5xl lg:text-9xl">coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex justify-between text-center lg:items-center">
            <div className="hidden lg:flex items-center space-x-2 mb-4">
              <RemeetIcon size={50} />
              <RemeetFullLogo className="text-orange-500" fill="#fff" />
            </div>
            <div>
              <Link href={"/"}>利用規約</Link>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 ReMeet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
