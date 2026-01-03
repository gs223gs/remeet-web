import Link from "next/link";
import { Menu, Users, Tag, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemeetIcon } from "@/components/util/RemeetIcon";
import { RemeetFullLogo } from "@/components/util/RemeetFullLogo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-row gap-4 items-center ">
              <RemeetIcon size={50} />
              <RemeetFullLogo className="text-orange-500" fill="#fff" />
            </div>

            <nav className="flex items-center space-x-8">
              <Button className="bg-orange-500 text-white hover:bg-orange-500/90">
                始める
              </Button>
            </nav>
          </div>
        </div>
      </header>

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
              <Button className="bg-orange-500 text-white hover:bg-orange-500/90 px-8 py-6 text-lg">
                今すぐ始める
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
                <div className="lg:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image
                      src="/rootpage/contactsView.png"
                      width={500}
                      height={500}
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

                <div className="lg:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image
                      src="/rootpage/contactsForm.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2 space-y-6">
                  <div className="inline-block px-4 py-2 bg-gray-100 rounded-full">
                    <span className="text-orange-600 font-semibold text-sm">
                      機能 03
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    細かい会話内容まで記録
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    今後のアップデートで、Markdown に対応します
                  </p>
                </div>

                <div className="lg:w-1/2">
                  <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-lg">
                    <Image
                      src="/rootpage/contactsForm2.png"
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              今すぐ始めましょう
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              ReMeetで、出会った人との関係をもっと深めましょう
            </p>
            <Button className="bg-orange-500 text-white hover:bg-orange-500/90 px-12 py-6 text-lg shadow-lg">
              無料で始める
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-4">
            <RemeetIcon size={50} />
            <RemeetFullLogo className="text-orange-500" fill="#fff" />
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 ReMeet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
